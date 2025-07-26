import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateSectionAssignmentType,
  UpdateSectionAssignmentType,
} from "@webcampus/schemas/department";

export class SectionAssignment {
  /**
   * Validate that both student and section belong to the same department.
   */
  private async validateSameDepartment(studentId: string, sectionId: string) {
    const student = await db.student.findUnique({
      where: { id: studentId },
      select: { departmentName: true },
    });

    if (!student) throw new Error("Student not found");

    const section = await db.section.findUnique({
      where: { id: sectionId },
      select: { departmentName: true },
    });

    if (!section) throw new Error("Section not found");

    if (student.departmentName !== section.departmentName) {
      throw new Error(
        "Student and Section do not belong to the same department"
      );
    }
  }

  async create(data: CreateSectionAssignmentType) {
    try {
      await this.validateSameDepartment(data.studentId, data.sectionId);

      const assignment = await db.studentSection.create({
        data,
        include: {
          student: {
            include: {
              user: {
                select: { name: true, email: true, username: true },
              },
            },
          },
          section: true,
        },
      });

      logger.info("Section assignment created successfully", { assignment });
      return {
        message: "Section assignment created successfully",
        data: assignment,
      };
    } catch (error) {
      logger.error("Error creating section assignment:", { error });
      throw error;
    }
  }

  async getAll() {
    try {
      const assignments = await db.studentSection.findMany({
        include: {
          student: {
            include: {
              user: { select: { name: true, email: true, username: true } },
            },
          },
          section: true,
        },
      });

      return {
        message: "Section assignments retrieved successfully",
        data: assignments,
      };
    } catch (error) {
      logger.error("Error retrieving section assignments:", { error });
      throw new Error("Failed to retrieve section assignments");
    }
  }

  async getById(id: string) {
    try {
      const assignment = await db.studentSection.findUnique({
        where: { id },
        include: {
          student: {
            include: {
              user: { select: { name: true, email: true, username: true } },
            },
          },
          section: true,
        },
      });

      if (!assignment) {
        return { message: "Section assignment not found", data: null };
      }

      return {
        message: "Section assignment retrieved successfully",
        data: assignment,
      };
    } catch (error) {
      logger.error("Error retrieving section assignment:", { error });
      throw new Error("Failed to retrieve section assignment");
    }
  }

  async getBySectionId(sectionId: string) {
    try {
      const assignments = await db.studentSection.findMany({
        where: { sectionId },
        include: {
          student: {
            include: {
              user: { select: { name: true, email: true, username: true } },
            },
          },
          section: true,
        },
      });

      return {
        message: "Section assignments for section retrieved successfully",
        data: assignments,
      };
    } catch (error) {
      logger.error("Error retrieving assignments by section:", { error });
      throw new Error("Failed to retrieve assignments by section");
    }
  }

  async update(id: string, data: UpdateSectionAssignmentType) {
    try {
      if (data.sectionId) {
        // Validate if updating sectionId
        const existing = await db.studentSection.findUnique({ where: { id } });
        if (!existing) throw new Error("Section assignment not found");
        await this.validateSameDepartment(existing.studentId, data.sectionId);
      }

      const updated = await db.studentSection.update({
        where: { id },
        data,
        include: {
          student: {
            include: {
              user: { select: { name: true, email: true, username: true } },
            },
          },
          section: true,
        },
      });

      logger.info("Section assignment updated successfully", { updated });
      return {
        message: "Section assignment updated successfully",
        data: updated,
      };
    } catch (error) {
      logger.error("Error updating section assignment:", { error });
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await db.studentSection.delete({ where: { id } });
      logger.info("Section assignment deleted successfully", { id });
      return { message: "Section assignment deleted successfully" };
    } catch (error) {
      logger.error("Error deleting section assignment:", { error });
      throw new Error("Failed to delete section assignment");
    }
  }
}
