import { logger } from "@webcampus/common/logger";
import { db, Prisma } from "@webcampus/db";
import {
  CreateSemesterInput,
  SemesterResponseType,
} from "@webcampus/schemas/admin";
import { BaseResponse } from "@webcampus/types/api";

export class SemesterService {
  static async create(
    data: CreateSemesterInput
  ): Promise<BaseResponse<SemesterResponseType>> {
    try {
      const semester = await db.semester.create({
        data: {
          ...data,
        },
      });
      const response: BaseResponse<SemesterResponseType> = {
        message: "Semester created successfully",
        data: semester,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error(`Semester ${data.type} ${data.year} already exists`);
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      logger.error({ error });
      throw new Error("Failed to create semester");
    }
  }

  static async delete(id: string): Promise<BaseResponse<null>> {
    try {
      await db.semester.delete({
        where: { id },
      });
      const response: BaseResponse<null> = {
        message: "Semester deleted successfully",
        data: null,
      };
      logger.info({ response });
      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Semester not found");
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      logger.error({ error });
      throw new Error("Failed to delete semester");
    }
  }
}
