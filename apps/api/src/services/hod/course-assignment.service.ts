import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateCourseAssignmentType,
  UpdateCourseAssignmentType,
} from "@webcampus/schemas/hod";

export class CourseAssignment {
  async create(data: CreateCourseAssignmentType) {
    try {
      const assignment = await db.courseAssignment.create({
        data,
        include: {
          course: true,
          faculty: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
          section: true,
          batch: true,
        },
      });

      logger.info("Course assignment created successfully", { assignment });

      return {
        message: "Course assignment created successfully",
        data: assignment,
      };
    } catch (error) {
      logger.error("Error creating course assignment:", { error });
      throw new Error("Failed to create course assignment");
    }
  }

  async getAll() {
    try {
      const assignments = await db.courseAssignment.findMany({
        include: {
          course: true,
          faculty: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
          section: true,
          batch: true,
        },
      });

      return {
        message: "Course assignments retrieved successfully",
        data: assignments,
      };
    } catch (error) {
      logger.error("Error retrieving course assignments:", { error });
      throw new Error("Failed to retrieve course assignments");
    }
  }

  async getById(id: string) {
    try {
      const assignment = await db.courseAssignment.findUnique({
        where: { id },
        include: {
          course: true,
          faculty: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
          section: true,
          batch: true,
        },
      });

      if (!assignment) {
        return {
          message: "Course assignment not found",
          data: null,
        };
      }

      return {
        message: "Course assignment retrieved successfully",
        data: assignment,
      };
    } catch (error) {
      logger.error("Error retrieving course assignment:", { error });
      throw new Error("Failed to retrieve course assignment");
    }
  }

  async getByFacultyId(facultyId: string) {
    try {
      const assignments = await db.courseAssignment.findMany({
        where: { facultyId },
        include: {
          course: true,
          section: true,
          batch: true,
        },
      });

      return {
        message: "Faculty's course assignments retrieved successfully",
        data: assignments,
      };
    } catch (error) {
      logger.error("Error retrieving faculty's course assignments:", { error });
      throw new Error("Failed to retrieve faculty's course assignments");
    }
  }

  async update(id: string, data: UpdateCourseAssignmentType) {
    try {
      const assignment = await db.courseAssignment.update({
        where: { id },
        data,
        include: {
          course: true,
          faculty: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
          section: true,
          batch: true,
        },
      });

      logger.info("Course assignment updated successfully", { assignment });

      return {
        message: "Course assignment updated successfully",
        data: assignment,
      };
    } catch (error) {
      logger.error("Error updating course assignment:", { error });
      throw new Error("Failed to update course assignment");
    }
  }

  async delete(id: string) {
    try {
      await db.courseAssignment.delete({
        where: { id },
      });

      logger.info("Course assignment deleted successfully", { id });

      return {
        message: "Course assignment deleted successfully",
      };
    } catch (error) {
      logger.error("Error deleting course assignment:", { error });
      throw new Error("Failed to delete course assignment");
    }
  }
}
