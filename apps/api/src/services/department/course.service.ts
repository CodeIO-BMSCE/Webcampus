import { BaseResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { Course, db } from "@webcampus/db";
import { CreateCourseDTO } from "@webcampus/schemas/department";

/**
 * Course service class
 */
export class CourseService {
  /**
   * Create a new course
   * @param data - Course creation data
   * @returns Created course with ID
   * @throws Error if course code already exists
   */
  async createCourse(data: CreateCourseDTO): Promise<BaseResponse<Course>> {
    try {
      const existingCourse = await db.course.findUnique({
        where: { code: data.code },
      });

      if (existingCourse) {
        logger.error("Course with this code already exists", {
          existingCourse,
        });
        throw new Error("Course with this code already exists");
      }

      const course = await db.course.create({
        data,
        include: {
          _count: {
            select: {
              assignments: true,
              registrations: true,
              marks: true,
              attendances: true,
            },
          },
        },
      });
      const response: BaseResponse<Course> = {
        message: "Course created successfully",
        data: course,
      };
      logger.info(response.message, {
        course,
      });
      return response;
    } catch (error) {
      logger.error("Course with this code already exists", {
        error,
      });
      throw new Error("Failed to create course");
    }
  }

  /**
   * Get a single course by ID
   * @param id - Course UUID
   * @returns Course data with related counts
   * @throws Error if course not found
   */
  async getCourseById(id: string): Promise<BaseResponse<Course>> {
    try {
      const course = await db.course.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              assignments: true,
              registrations: true,
              marks: true,
              attendances: true,
            },
          },
        },
      });

      if (!course) {
        throw new Error("Course not found");
      }
      const response: BaseResponse<Course> = {
        message: "Course Fetched successfully",
        data: course,
      };
      logger.info(response.message, {
        course,
      });
      return response;
    } catch (error) {
      logger.error("Failed to fetch course", { error });
      throw new Error("Failed to fetch course", {
        cause: error,
      });
    }
  }
}
