import { logger } from "@webcampus/common/logger";
import { db, Prisma } from "@webcampus/db";
import {
  CourseAssignmentResponseType,
  CreateCourseAssignmentType,
} from "@webcampus/schemas/hod";
import { BaseResponse } from "@webcampus/types/api";

export class CourseAssignment {
  static async create(
    data: CreateCourseAssignmentType
  ): Promise<BaseResponse<CourseAssignmentResponseType>> {
    try {
      const assignment = await db.courseAssignment.create({
        data,
      });
      const response: BaseResponse<CourseAssignmentResponseType> = {
        message: "Course assignment created successfully",
        data: assignment,
      };
      logger.info(response);
      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Course assignment already exists");
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      logger.error("Error creating course assignment:", { error });
      throw new Error("Failed to create course assignment");
    }
  }

  async getAll() {
    try {
      const assignments = await db.courseAssignment.findMany({
        include: {
          course: true,
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
