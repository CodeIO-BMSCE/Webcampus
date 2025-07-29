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
        status: "success",
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

  async getAll(): Promise<BaseResponse<CourseAssignmentResponseType[]>> {
    try {
      const assignments = await db.courseAssignment.findMany();
      const response: BaseResponse<CourseAssignmentResponseType[]> = {
        status: "success",
        message: "Course assignments retrieved successfully",
        data: assignments,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error retrieving course assignments:", { error });
      throw new Error("Failed to retrieve course assignments");
    }
  }

  async getById(
    id: string
  ): Promise<BaseResponse<CourseAssignmentResponseType>> {
    try {
      const assignment = await db.courseAssignment.findUnique({
        where: { id },
      });

      if (!assignment) {
        throw new Error("Course assignment not found");
      }

      const response: BaseResponse<CourseAssignmentResponseType> = {
        status: "success",
        message: "Course assignment retrieved successfully",
        data: assignment,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error retrieving course assignment:", { error });
      throw new Error("Failed to retrieve course assignment");
    }
  }

  async getByFacultyId(
    facultyId: string
  ): Promise<BaseResponse<CourseAssignmentResponseType[]>> {
    try {
      const assignments = await db.courseAssignment.findMany({
        where: { facultyId },
      });

      const response: BaseResponse<CourseAssignmentResponseType[]> = {
        status: "success",
        message: "Faculty's course assignments retrieved successfully",
        data: assignments || null,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error retrieving faculty's course assignments:", { error });
      throw new Error("Failed to retrieve faculty's course assignments");
    }
  }

  async delete(id: string): Promise<BaseResponse<void>> {
    try {
      await db.courseAssignment.delete({
        where: { id },
      });
      logger.info("Course assignment deleted successfully", { id });
      const response: BaseResponse<void> = {
        status: "success",
        message: "Course assignment deleted successfully",
        data: null,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error deleting course assignment:", { error });
      throw new Error("Failed to delete course assignment");
    }
  }
}
