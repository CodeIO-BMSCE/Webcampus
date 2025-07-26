import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateAttendanceType,
  UpdateAttendanceType,
} from "@webcampus/schemas/faculty";

export class Attendance {
  async create(data: CreateAttendanceType) {
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
          data: null,
        };
      }

      const attendance = await db.attendance.create({
        data,
        include: {
          student: {
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
            },
          },
          course: true,
        },
      });

      logger.info("Attendance created successfully", { attendance });

      return {
        message: "Attendance created successfully",
        data: attendance,
      };
    } catch (error) {
      logger.error("Error creating attendance:", { error });
      throw new Error("Failed to create attendance");
    }
  }

  async getAll() {
    try {
      const attendances = await db.attendance.findMany({
        include: {
          student: {
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
            },
          },
          course: true,
        },
      });

      return {
        message: "Attendances retrieved successfully",
        data: attendances,
      };
    } catch (error) {
      logger.error("Error retrieving attendances:", { error });
      throw new Error("Failed to retrieve attendances");
    }
  }

  async getById(id: string) {
    try {
      const attendance = await db.attendance.findUnique({
        where: { id },
        include: {
          student: {
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
            },
          },
          course: true,
        },
      });

      if (!attendance) {
        return {
          message: "Attendance not found",
          data: null,
        };
      }

      return {
        message: "Attendance retrieved successfully",
        data: attendance,
      };
    } catch (error) {
      logger.error("Error retrieving attendance:", { error });
      throw new Error("Failed to retrieve attendance");
    }
  }

  async getByStudentAndCourse(studentId: string, courseId: string) {
    try {
      const attendance = await db.attendance.findUnique({
        where: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
        include: {
          student: {
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
            },
          },
          course: true,
        },
      });

      if (!attendance) {
        return {
          message: "Attendance not found",
          data: null,
        };
      }

      return {
        message: "Attendance retrieved successfully",
        data: attendance,
      };
    } catch (error) {
      logger.error("Error retrieving attendance:", { error });
      throw new Error("Failed to retrieve attendance");
    }
  }

  async update(id: string, data: UpdateAttendanceType) {
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
          data: null,
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
            "Cannot update attendance as it has been frozen by HOD or admin",
          data: null,
        };
      }

      const attendance = await db.attendance.update({
        where: { id },
        data,
        include: {
          student: {
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
            },
          },
          course: true,
        },
      });

      logger.info("Attendance updated successfully", { attendance });

      return {
        message: "Attendance updated successfully",
        data: attendance,
      };
    } catch (error) {
      logger.error("Error updating attendance:", { error });
      throw new Error("Failed to update attendance");
    }
  }

  async delete(id: string) {
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
          data: null,
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
            "Cannot delete attendance as it has been frozen by HOD or admin",
          data: null,
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
