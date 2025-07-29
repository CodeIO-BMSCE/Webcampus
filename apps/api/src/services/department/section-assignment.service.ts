import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateSectionAssignmentType,
  SectionAssignmentResponseType,
  UpdateSectionAssignmentType,
} from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";

export class SectionAssignment {
  static async validateSameDepartment(studentId: string, sectionId: string) {
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

  static async create(
    data: CreateSectionAssignmentType
  ): Promise<BaseResponse<SectionAssignmentResponseType>> {
    try {
      await SectionAssignment.validateSameDepartment(
        data.studentId,
        data.sectionId
      );
      const assignment = await db.studentSection.create({
        data,
      });

      const response: BaseResponse<SectionAssignmentResponseType> = {
        status: "success",
        message: "Section assignment created successfully",
        data: assignment,
      };
      logger.info(response);
      return response;
    } catch (error) {
      logger.error("Error creating section assignment:", { error });
      throw error;
    }
  }

  static async getAll(): Promise<
    BaseResponse<SectionAssignmentResponseType[]>
  > {
    try {
      const assignments = await db.studentSection.findMany();

      const response: BaseResponse<SectionAssignmentResponseType[]> = {
        status: "success",
        message: "Section assignments retrieved successfully",
        data: assignments,
      };
      logger.info(response);
      return response;
    } catch (error) {
      logger.error("Error retrieving section assignments:", { error });
      throw new Error("Failed to retrieve section assignments");
    }
  }

  static async getById(
    id: string
  ): Promise<BaseResponse<SectionAssignmentResponseType>> {
    try {
      const assignment = await db.studentSection.findUnique({
        where: { id },
      });

      if (!assignment) {
        throw new Error("Section assignment not found");
      }

      const response: BaseResponse<SectionAssignmentResponseType> = {
        status: "success",
        message: "Section assignment retrieved successfully",
        data: assignment,
      };
      logger.info(response);
      return response;
    } catch (error) {
      logger.error("Error retrieving section assignment:", { error });
      throw new Error("Failed to retrieve section assignment");
    }
  }

  static async getBySectionId(
    sectionId: string
  ): Promise<BaseResponse<SectionAssignmentResponseType[]>> {
    try {
      const assignments = await db.studentSection.findMany({
        where: { sectionId },
      });

      const response: BaseResponse<SectionAssignmentResponseType[]> = {
        status: "success",
        message: "Section assignments for section retrieved successfully",
        data: assignments,
      };
      logger.info(response);
      return response;
    } catch (error) {
      logger.error("Error retrieving assignments by section:", { error });
      throw new Error("Failed to retrieve assignments by section");
    }
  }

  static async update(
    id: string,
    data: UpdateSectionAssignmentType
  ): Promise<BaseResponse<SectionAssignmentResponseType>> {
    try {
      if (data.sectionId) {
        const existing = await db.studentSection.findUnique({ where: { id } });
        if (!existing) throw new Error("Section assignment not found");
        await this.validateSameDepartment(existing.studentId, data.sectionId);
      }

      const updated = await db.studentSection.update({
        where: { id },
        data,
      });

      const response: BaseResponse<SectionAssignmentResponseType> = {
        status: "success",
        message: "Section assignment updated successfully",
        data: updated,
      };
      logger.info(response);
      return response;
    } catch (error) {
      logger.error("Error updating section assignment:", { error });
      throw error;
    }
  }

  static async delete(id: string): Promise<BaseResponse<void>> {
    try {
      await db.studentSection.delete({ where: { id } });
      const response: BaseResponse<void> = {
        status: "success",
        message: "Section assignment deleted successfully",
        data: null,
      };
      logger.info(response);
      return response;
    } catch (error) {
      logger.error("Error deleting section assignment:", { error });
      throw new Error("Failed to delete section assignment");
    }
  }
}
