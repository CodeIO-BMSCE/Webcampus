import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CourseRegistrationResponseType,
  CreateCourseRegistrationType,
  UpdateCourseRegistrationType,
} from "@webcampus/schemas/student";
import { BaseResponse } from "@webcampus/types/api";

export class CourseRegistration {
  static async create(
    data: CreateCourseRegistrationType
  ): Promise<BaseResponse<CourseRegistrationResponseType>> {
    try {
      const registration = await db.courseRegistration.create({
        data,
      });
      const response: BaseResponse<CourseRegistrationResponseType> = {
        status: "success",
        message: "Course registration created successfully",
        data: registration,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error creating course registration:", { error });
      throw new Error("Failed to create course registration");
    }
  }

  static async getAll(): Promise<
    BaseResponse<CourseRegistrationResponseType[]>
  > {
    try {
      const registrations = await db.courseRegistration.findMany();
      const response: BaseResponse<CourseRegistrationResponseType[]> = {
        status: "success",
        message: "Course registrations retrieved successfully",
        data: registrations,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error retrieving course registrations:", { error });
      throw new Error("Failed to retrieve course registrations");
    }
  }

  static async getById(
    id: string
  ): Promise<BaseResponse<CourseRegistrationResponseType>> {
    try {
      const registration = await db.courseRegistration.findUnique({
        where: { id },
      });

      if (!registration) {
        throw new Error("Course registration not found");
      }

      const response: BaseResponse<CourseRegistrationResponseType> = {
        status: "success",
        message: "Course registration retrieved successfully",
        data: registration,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error retrieving course registration:", { error });
      throw new Error("Failed to retrieve course registration");
    }
  }

  static async getByStudentId(
    studentId: string
  ): Promise<BaseResponse<CourseRegistrationResponseType[]>> {
    try {
      const registrations = await db.courseRegistration.findMany({
        where: { studentId },
      });

      const response: BaseResponse<CourseRegistrationResponseType[]> = {
        status: "success",
        message: "Student's course registrations retrieved successfully",
        data: registrations,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error retrieving student's course registrations:", {
        error,
      });
      throw new Error("Failed to retrieve student's course registrations");
    }
  }

  static async update(
    id: string,
    data: UpdateCourseRegistrationType
  ): Promise<BaseResponse<CourseRegistrationResponseType>> {
    try {
      const registration = await db.courseRegistration.update({
        where: { id },
        data,
      });

      const response: BaseResponse<CourseRegistrationResponseType> = {
        status: "success",
        message: "Course registration updated successfully",
        data: registration,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error updating course registration:", { error });
      throw new Error("Failed to update course registration");
    }
  }

  static async delete(id: string): Promise<BaseResponse<void>> {
    try {
      await db.courseRegistration.delete({
        where: { id },
      });

      const response: BaseResponse<void> = {
        status: "success",
        message: "Course registration deleted successfully",
        data: null,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error deleting course registration:", { error });
      throw new Error("Failed to delete course registration");
    }
  }
}
