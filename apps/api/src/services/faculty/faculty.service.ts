import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateFacultyType,
  UpdateFacultyType,
} from "@webcampus/schemas/faculty";

export class Faculty {
  async create(data: CreateFacultyType) {
    try {
      const faculty = await db.faculty.create({
        data: {
          userId: data.userId,
          branchId: data.branchId,
        },
        include: {
          user: true,
          branch: true,
        },
      });

      logger.info("Faculty created successfully", { faculty });

      return {
        message: "Faculty created successfully",
        data: faculty,
      };
    } catch (error) {
      logger.error("Error creating faculty:", { error });
      throw new Error("Failed to create faculty");
    }
  }

  async getAll() {
    try {
      const faculties = await db.faculty.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              displayUsername: true,
            },
          },
          branch: true,
        },
      });

      return {
        message: "Faculties retrieved successfully",
        data: faculties,
      };
    } catch (error) {
      logger.error("Error retrieving faculties:", { error });
      throw new Error("Failed to retrieve faculties");
    }
  }

  async getById(id: string) {
    try {
      const faculty = await db.faculty.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              displayUsername: true,
            },
          },
          branch: true,
          teaches: true,
        },
      });

      if (!faculty) {
        return {
          message: "Faculty not found",
          data: null,
        };
      }

      return {
        message: "Faculty retrieved successfully",
        data: faculty,
      };
    } catch (error) {
      logger.error("Error retrieving faculty:", { error });
      throw new Error("Failed to retrieve faculty");
    }
  }

  async update(id: string, data: UpdateFacultyType) {
    try {
      const faculty = await db.faculty.update({
        where: { id },
        data,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              displayUsername: true,
            },
          },
          branch: true,
        },
      });

      logger.info("Faculty updated successfully", { faculty });

      return {
        message: "Faculty updated successfully",
        data: faculty,
      };
    } catch (error) {
      logger.error("Error updating faculty:", { error });
      throw new Error("Failed to update faculty");
    }
  }

  async delete(id: string) {
    try {
      await db.faculty.delete({
        where: { id },
      });

      logger.info("Faculty deleted successfully", { id });

      return {
        message: "Faculty deleted successfully",
      };
    } catch (error) {
      logger.error("Error deleting faculty:", { error });
      throw new Error("Failed to delete faculty");
    }
  }
}
