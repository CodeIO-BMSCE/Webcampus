import { logger } from "@webcampus/common/logger";
import { db, Prisma } from "@webcampus/db";
import {
  CreateSectionType,
  SectionQueryType,
  SectionResponseType,
} from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";

export class Section {
  static async create(
    data: CreateSectionType
  ): Promise<BaseResponse<SectionResponseType>> {
    try {
      const section = await db.section.create({
        data,
      });

      const response: BaseResponse<SectionResponseType> = {
        message: "Section created successfully",
        data: section,
      };
      logger.info(response);
      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Section already exists");
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      logger.error("Error creating section:", { error });
      throw new Error("Failed to create section");
    }
  }

  static async getAll(
    query: SectionQueryType
  ): Promise<BaseResponse<SectionResponseType[]>> {
    try {
      const sections = await db.section.findMany({
        where: {
          ...query,
        },
      });
      const response: BaseResponse<SectionResponseType[]> = {
        message: "Sections retrieved successfully",
        data: sections,
      };
      logger.info(response);
      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("No sections found");
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      logger.error("Error retrieving sections:", { error });
      throw new Error("Failed to retrieve sections");
    }
  }

  static async getById(id: string) {
    try {
      const section = await db.section.findUnique({
        where: { id },
        include: {
          department: true,
          courses: true,
          studentSections: true,
          batches: true,
        },
      });

      if (!section) {
        return {
          message: "Section not found",
          data: null,
        };
      }

      return {
        message: "Section retrieved successfully",
        data: section,
      };
    } catch (error) {
      logger.error("Error retrieving section:", { error });
      throw new Error("Failed to retrieve section");
    }
  }

  async delete(id: string) {
    try {
      await db.section.delete({
        where: { id },
      });

      logger.info("Section deleted successfully", { id });

      return {
        message: "Section deleted successfully",
      };
    } catch (error) {
      logger.error("Error deleting section:", { error });
      throw new Error("Failed to delete section");
    }
  }
}
