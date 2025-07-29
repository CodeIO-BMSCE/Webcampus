import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateFacultyType,
  FacultyResponseType,
  UpdateFacultyType,
} from "@webcampus/schemas/faculty";
import { BaseResponse } from "@webcampus/types/api";

export class Faculty {
  static async create(
    data: CreateFacultyType
  ): Promise<BaseResponse<FacultyResponseType>> {
    try {
      const faculty = await db.faculty.create({
        data: {
          userId: data.userId,
          departmentName: data.departmentName,
        },
      });
      const response: BaseResponse<FacultyResponseType> = {
        status: "success",
        message: "Faculty created successfully",
        data: faculty,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error creating faculty:", { error });
      throw new Error("Failed to create faculty");
    }
  }

  static async getAll(): Promise<BaseResponse<FacultyResponseType[]>> {
    try {
      const faculties = await db.faculty.findMany();
      const response: BaseResponse<FacultyResponseType[]> = {
        status: "success",
        message: "Faculties retrieved successfully",
        data: faculties,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error retrieving faculties:", { error });
      throw new Error("Failed to retrieve faculties");
    }
  }

  static async getById(id: string): Promise<BaseResponse<FacultyResponseType>> {
    try {
      const faculty = await db.faculty.findUnique({
        where: { id },
      });

      if (!faculty) {
        throw new Error("Faculty not found");
      }

      const response: BaseResponse<FacultyResponseType> = {
        status: "success",
        message: "Faculty retrieved successfully",
        data: faculty,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error retrieving faculty:", { error });
      throw new Error("Failed to retrieve faculty");
    }
  }

  static async update(
    id: string,
    data: UpdateFacultyType
  ): Promise<BaseResponse<FacultyResponseType>> {
    try {
      const faculty = await db.faculty.update({
        where: { id },
        data: {
          departmentName: data.departmentName,
        },
      });

      const response: BaseResponse<FacultyResponseType> = {
        status: "success",
        message: "Faculty updated successfully",
        data: faculty,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error updating faculty:", { error });
      throw new Error("Failed to update faculty");
    }
  }

  static async delete(id: string): Promise<BaseResponse<void>> {
    try {
      await db.faculty.delete({
        where: { id },
      });

      const response: BaseResponse<void> = {
        status: "success",
        message: "Faculty deleted successfully",
        data: null,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      logger.error("Error deleting faculty:", { error });
      throw new Error("Failed to delete faculty");
    }
  }
}
