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
          message: "Attendance already exists for this student and course",
        };
      }

      const attendance = await db.attendance.create({
        data,
      });

      logger.info("Attendance created successfully", { attendance });

      return {
        message: "Attendance created successfully",
        data: attendance as AttendanceResponseType,
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
        message: "Attendances retrieved successfully",
        data: attendances as AttendanceResponseType[],
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
          message: "Attendance not found",
        };
      }

      return {
        message: "Attendance retrieved successfully",
        data: attendance as AttendanceResponseType,
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
          message: "Attendance not found",
        };
      }

      return {
        message: "Attendance retrieved successfully",
        data: attendance as AttendanceResponseType,
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

      if (!existingAttendance) {
        return {
          message: "Attendance not found",
        };
      }

      const courseAssignment = existingAttendance.course.assignments[0];
      if (
        courseAssignment?.freezes[0]?.facultyFrozen ||
        courseAssignment?.freezes[0]?.hodFrozen ||
        courseAssignment?.freezes[0]?.adminFrozen
      ) {
        return {
          message:
            "Cannot update attendance as it has been frozen by faculty, HOD, or admin",
        };
      }

      const attendance = await db.attendance.update({
        where: { id },
        data,
      });

      logger.info("Attendance updated successfully", { attendance });

      return {
        message: "Attendance updated successfully",
        data: attendance as AttendanceResponseType,
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

      if (!existingAttendance) {
        return {
          message: "Attendance not found",
        };
      }

      const courseAssignment = existingAttendance.course.assignments[0];
      if (
        courseAssignment?.freezes[0]?.facultyFrozen ||
        courseAssignment?.freezes[0]?.hodFrozen ||
        courseAssignment?.freezes[0]?.adminFrozen
      ) {
        return {
          message:
            "Cannot delete attendance as it has been frozen by faculty, HOD, or admin",
        };
      }

      await db.attendance.delete({
        where: { id },
      });

      logger.info("Attendance deleted successfully", { id });

      return {
        message: "Attendance deleted successfully",
      };
    } catch (error) {
      logger.error("Error deleting attendance:", { error });
      throw new Error("Failed to delete attendance");
    }
  }
}

// TODO: Bro change the things mentioned in makrs services here as well please, I guess you can ask Supriya and Akanksha for the Freeze model
