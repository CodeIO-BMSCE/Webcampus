import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateMarkType,
  MarkResponseType,
  UpdateMarkType,
} from "@webcampus/schemas/faculty";
import { BaseResponse } from "@webcampus/types/api";

export class Mark {
  static async create(
    data: CreateMarkType
  ): Promise<BaseResponse<MarkResponseType>> {
    try {
      const existingMark = await db.mark.findUnique({
        where: {
          studentId_courseId: {
            studentId: data.studentId,
            courseId: data.courseId,
          },
        },
      });

      if (existingMark) {
        return {
          status: "error",
          message: "Mark already exists for this student and course",
          error: "Mark already exists for this student and course",
        };
      }

      const mark = await db.mark.create({
        data,
      });

      logger.info("Mark created successfully", { mark });

      return {
        status: "success",
        message: "Mark created successfully",
        data: mark,
      };
    } catch (error) {
      logger.error("Error creating mark:", { error });
      throw new Error("Failed to create mark");
    }
  }

  static async getAll(): Promise<BaseResponse<MarkResponseType[]>> {
    try {
      const marks = await db.mark.findMany();

      return {
        status: "success",
        message: "Marks retrieved successfully",
        data: marks,
      };
    } catch (error) {
      logger.error("Error retrieving marks:", { error });
      throw new Error("Failed to retrieve marks");
    }
  }

  static async getById(id: string): Promise<BaseResponse<MarkResponseType>> {
    try {
      const mark = await db.mark.findUnique({
        where: { id },
      });

      if (!mark) {
        return {
          status: "error",
          message: "Mark not found",
          error: "Mark not found",
        };
      }

      return {
        status: "success",
        message: "Mark retrieved successfully",
        data: mark,
      };
    } catch (error) {
      logger.error("Error retrieving mark:", { error });
      throw new Error("Failed to retrieve mark");
    }
  }

  static async getByStudentAndCourse(
    studentId: string,
    courseId: string
  ): Promise<BaseResponse<MarkResponseType>> {
    try {
      const mark = await db.mark.findUnique({
        where: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
      });

      if (!mark) {
        return {
          status: "error",
          message: "Mark not found",
          error: "Mark not found",
        };
      }

      return {
        status: "success",
        message: "Mark retrieved successfully",
        data: mark,
      };
    } catch (error) {
      logger.error("Error retrieving mark:", { error });
      throw new Error("Failed to retrieve mark");
    }
  }

  static async update(
    id: string,
    data: UpdateMarkType
  ): Promise<BaseResponse<MarkResponseType>> {
    try {
      const existingMark = await db.mark.findUnique({
        where: { id },
        include: {
          course: {
            include: {
              assignments: {
                include: {
                  freezes: true,
                },
              },
            },
          },
        },
      });

      if (!existingMark) {
        return {
          status: "error",
          message: "Mark not found",
          error: "Mark not found",
        };
      }
      // TODO :- Bro please check if the freezing thing below I have handled properly or not, I have just done as per my understanding
      // Bro, I have followed the same in here and attendance as well,

      const courseAssignment = existingMark.course.assignments[0];
      const freeze = courseAssignment?.freezes[0];

      if (freeze?.facultyFrozen || freeze?.hodFrozen || freeze?.adminFrozen) {
        return {
          status: "error",
          message: "Cannot update mark as it has been frozen by HOD or admin",
          error: "Cannot update mark as it has been frozen by HOD or admin",
        };
      }

      const mark = await db.mark.update({
        where: { id },
        data,
      });

      logger.info("Mark updated successfully", { mark });

      return {
        status: "success",
        message: "Mark updated successfully",
        data: mark,
      };
    } catch (error) {
      logger.error("Error updating mark:", { error });
      throw new Error("Failed to update mark");
    }
  }

  static async delete(id: string): Promise<BaseResponse<void>> {
    try {
      const existingMark = await db.mark.findUnique({
        where: { id },
        include: {
          course: {
            include: {
              assignments: {
                include: {
                  freezes: true,
                },
              },
            },
          },
        },
      });

      if (!existingMark) {
        return {
          status: "error",
          message: "Mark not found",
          error: "Mark not found",
        };
      }

      const courseAssignment = existingMark.course.assignments[0];
      const freeze = courseAssignment?.freezes[0];

      if (freeze?.hodFrozen || freeze?.adminFrozen) {
        return {
          status: "error",
          message: "Cannot delete mark as it has been frozen by HOD or admin",
          error: "Cannot delete mark as it has been frozen by HOD or admin",
        };
      }

      await db.mark.delete({
        where: { id },
      });

      logger.info("Mark deleted successfully", { id });

      return {
        status: "success",
        message: "Mark deleted successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Error deleting mark:", { error });
      throw new Error("Failed to delete mark");
    }
  }
}
