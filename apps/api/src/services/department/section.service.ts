import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateSectionType,
  UpdateSectionType,
} from "@webcampus/schemas/department";

export class Section {
  async create(data: CreateSectionType) {
    try {
      const section = await db.section.create({
        data,
        include: {
          department: true,
          courses: true,
          studentSections: true,
          batches: true,
        },
      });

      logger.info("Section created successfully", { section });

      return {
        message: "Section created successfully",
        data: section,
      };
    } catch (error) {
      logger.error("Error creating section:", { error });
      throw new Error("Failed to create section");
    }
  }

  async getAll() {
    try {
      const sections = await db.section.findMany({
        include: {
          department: true,
          courses: true,
          studentSections: true,
          batches: true,
        },
      });

      return {
        message: "Sections retrieved successfully",
        data: sections,
      };
    } catch (error) {
      logger.error("Error retrieving sections:", { error });
      throw new Error("Failed to retrieve sections");
    }
  }

  async getById(id: string) {
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

  async getByDepartmentName(departmentName: string) {
    try {
      const sections = await db.section.findMany({
        where: { departmentName },
        include: {
          department: true,
          courses: true,
          studentSections: true,
          batches: true,
        },
      });

      return {
        message: "Branch's sections retrieved successfully",
        data: sections,
      };
    } catch (error) {
      logger.error("Error retrieving branch's sections:", { error });
      throw new Error("Failed to retrieve branch's sections");
    }
  }

  async update(id: string, data: UpdateSectionType) {
    try {
      const section = await db.section.update({
        where: { id },
        data,
        include: {
          department: true,
          courses: true,
          studentSections: true,
          batches: true,
        },
      });

      logger.info("Section updated successfully", { section });

      return {
        message: "Section updated successfully",
        data: section,
      };
    } catch (error) {
      logger.error("Error updating section:", { error });
      throw new Error("Failed to update section");
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
