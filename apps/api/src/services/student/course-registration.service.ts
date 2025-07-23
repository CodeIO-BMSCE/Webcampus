import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateCourseRegistrationType,
  UpdateCourseRegistrationType,
} from "@webcampus/schemas/student";

export class CourseRegistration {
  async create(data: CreateCourseRegistrationType) {
    try {
      const registration = await db.courseRegistration.create({
        data,
        include: {
          student: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
          course: true,
        },
      });

      logger.info("Course registration created successfully", { registration });

      return {
        message: "Course registration created successfully",
        data: registration,
      };
    } catch (error) {
      logger.error("Error creating course registration:", { error });
      throw new Error("Failed to create course registration");
    }
  }

  async getAll() {
    try {
      const registrations = await db.courseRegistration.findMany({
        include: {
          student: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
          course: true,
        },
      });

      return {
        message: "Course registrations retrieved successfully",
        data: registrations,
      };
    } catch (error) {
      logger.error("Error retrieving course registrations:", { error });
      throw new Error("Failed to retrieve course registrations");
    }
  }

  async getById(id: string) {
    try {
      const registration = await db.courseRegistration.findUnique({
        where: { id },
        include: {
          student: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
          course: true,
        },
      });

      if (!registration) {
        return {
          message: "Course registration not found",
          data: null,
        };
      }

      return {
        message: "Course registration retrieved successfully",
        data: registration,
      };
    } catch (error) {
      logger.error("Error retrieving course registration:", { error });
      throw new Error("Failed to retrieve course registration");
    }
  }

  async getByStudentId(studentId: string) {
    try {
      const registrations = await db.courseRegistration.findMany({
        where: { studentId },
        include: {
          course: true,
        },
      });

      return {
        message: "Student's course registrations retrieved successfully",
        data: registrations,
      };
    } catch (error) {
      logger.error("Error retrieving student's course registrations:", {
        error,
      });
      throw new Error("Failed to retrieve student's course registrations");
    }
  }

  async update(id: string, data: UpdateCourseRegistrationType) {
    try {
      const registration = await db.courseRegistration.update({
        where: { id },
        data,
        include: {
          student: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
          course: true,
        },
      });

      logger.info("Course registration updated successfully", { registration });

      return {
        message: "Course registration updated successfully",
        data: registration,
      };
    } catch (error) {
      logger.error("Error updating course registration:", { error });
      throw new Error("Failed to update course registration");
    }
  }

  async delete(id: string) {
    try {
      await db.courseRegistration.delete({
        where: { id },
      });

      logger.info("Course registration deleted successfully", { id });

      return {
        message: "Course registration deleted successfully",
      };
    } catch (error) {
      logger.error("Error deleting course registration:", { error });
      throw new Error("Failed to delete course registration");
    }
  }
}
