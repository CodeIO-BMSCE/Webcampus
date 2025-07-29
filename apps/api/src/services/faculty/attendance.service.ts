import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  AttendanceResponseType,
  CreateAttendanceType,
  UpdateAttendanceType,
} from "@webcampus/schemas/faculty";
import { BaseResponse } from "@webcampus/types/api";

export class Attendance {
  static async create(
    data: CreateAttendanceType
  ): Promise<BaseResponse<AttendanceResponseType>> {
    try {
      const existingAttendance = await db.attendance.findUnique({
        where: {
          studentId_courseId: {
            studentId: data.studentId,
            courseId: data.courseId,
          },
        },
      });

      if (existingAttendance) {
        return {
          status: "error",
          message: "Attendance already exists for this student and course",
          error: "Attendance already exists for this student and course",
        };
      }

      const attendance = await db.attendance.create({
        data,
      });

      return {
        status: "success",
        message: "Attendance created successfully",
        data: attendance,
      };
    } catch (error) {
      logger.error("Error creating attendance:", { error });
      throw new Error("Failed to create attendance");
    }
  }

  static async getAll(): Promise<BaseResponse<AttendanceResponseType[]>> {
    try {
      const attendances = await db.attendance.findMany();

      return {
        status: "success",
        message: "Attendances retrieved successfully",
        data: attendances,
      };
    } catch (error) {
      logger.error("Error retrieving attendances:", { error });
      throw new Error("Failed to retrieve attendances");
    }
  }

  static async getById(
    id: string
  ): Promise<BaseResponse<AttendanceResponseType>> {
    try {
      const attendance = await db.attendance.findUnique({
        where: { id },
      });

      if (!attendance) {
        return {
          status: "error",
          message: "Attendance not found",
          error: "Attendance not found",
        };
      }

      return {
        status: "success",
        message: "Attendance retrieved successfully",
        data: attendance,
      };
    } catch (error) {
      logger.error("Error retrieving attendance:", { error });
      throw new Error("Failed to retrieve attendance");
    }
  }

  static async getByStudentAndCourse(
    studentId: string,
    courseId: string
  ): Promise<BaseResponse<AttendanceResponseType>> {
    try {
      const attendance = await db.attendance.findUnique({
        where: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
      });

      if (!attendance) {
        return {
          status: "error",
          message: "Attendance not found",
          error: "Attendance not found",
        };
      }

      return {
        status: "success",
        message: "Attendance retrieved successfully",
        data: attendance,
      };
    } catch (error) {
      logger.error("Error retrieving attendance:", { error });
      throw new Error("Failed to retrieve attendance");
    }
  }

  static async update(
    id: string,
    data: UpdateAttendanceType
  ): Promise<BaseResponse<AttendanceResponseType>> {
    try {
      const existingAttendance = await db.attendance.findUnique({
        where: { id },
        select: {
          course: {
            select: {
              assignments: {
                select: {
                  freezes: true,
                },
              },
            },
          },
        },
      });

      if (!existingAttendance) {
        return {
          status: "error",
          message: "Attendance not found",
          error: "Attendance not found",
        };
      }

      const courseAssignment = existingAttendance.course.assignments[0];
      if (
        courseAssignment?.freezes[0]?.facultyFrozen ||
        courseAssignment?.freezes[0]?.hodFrozen ||
        courseAssignment?.freezes[0]?.adminFrozen
      ) {
        return {
          status: "error",
          message:
            "Cannot update attendance as it has been frozen by faculty, HOD, or admin",
          error:
            "Cannot update attendance as it has been frozen by faculty, HOD, or admin",
        };
      }

      const attendance = await db.attendance.update({
        where: { id },
        data,
      });
      return {
        status: "success",
        message: "Attendance updated successfully",
        data: attendance,
      };
    } catch (error) {
      logger.error("Error updating attendance:", { error });
      throw new Error("Failed to update attendance");
    }
  }

  static async delete(id: string): Promise<BaseResponse<void>> {
    try {
      const existingAttendance = await db.attendance.findUnique({
        where: { id },
        select: {
          course: {
            select: {
              assignments: {
                select: {
                  freezes: true,
                },
              },
            },
          },
        },
      });
      if (!existingAttendance) {
        return {
          status: "error",
          message: "Attendance not found",
          error: "Attendance not found",
        };
      }
      const courseAssignment = existingAttendance.course.assignments[0];
      if (
        courseAssignment?.freezes[0]?.facultyFrozen ||
        courseAssignment?.freezes[0]?.hodFrozen ||
        courseAssignment?.freezes[0]?.adminFrozen
      ) {
        return {
          error: "Attendance not found",
          status: "error",
          message:
            "Cannot delete attendance as it has been frozen by faculty, HOD, or admin",
        };
      }
      await db.attendance.delete({
        where: { id },
      });
      return {
        status: "success",
        message: "Attendance deleted successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Error deleting attendance:", { error });
      throw new Error("Failed to delete attendance");
    }
  }
}
