import { logger } from "@webcampus/common/logger";
import { db, Prisma } from "@webcampus/db";
import {
  CreateSemesterType,
  SemesterQueryType,
  SemesterResponseType,
} from "@webcampus/schemas/admin";
import { UUIDType } from "@webcampus/schemas/common";
import { BaseResponse } from "@webcampus/types/api";

export class SemesterService {
  static async create(
    data: CreateSemesterType
  ): Promise<BaseResponse<SemesterResponseType>> {
    try {
      const semester = await db.semester.create({
        data: {
          ...data,
        },
      });
      const response: BaseResponse<SemesterResponseType> = {
        status: "success",
        message: "Semester created successfully",
        data: semester,
      };
      logger.info(response);
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

  static async getAll(
    query: SemesterQueryType
  ): Promise<BaseResponse<SemesterResponseType[]>> {
    try {
      const semesters = await db.semester.findMany({
        where: {
          ...query,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const response: BaseResponse<SemesterResponseType[]> = {
        status: "success",
        message: "Semesters fetched successfully",
        data: semesters,
      };
      logger.info(response);
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
      throw new Error("Failed to fetch semesters");
    }
  }

  static async delete({ id }: UUIDType): Promise<BaseResponse<null>> {
    try {
      await db.semester.delete({
        where: { id },
      });
      const response: BaseResponse<null> = {
        status: "success",
        message: "Semester deleted successfully",
        data: null,
      };
      logger.info(response);
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
