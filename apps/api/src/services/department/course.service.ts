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
  static async createCourse(
    data: CreateCourseDTO
  ): Promise<BaseResponse<Course>> {
    try {
      const existingCourse = await db.course.findUnique({
        where: { code: data.code },
      });

      if (existingCourse) {
        const errorMessage = "Course with this code already exists";
        logger.error(errorMessage, {
          code: data.code,
          existingCourseId: existingCourse.id,
        });
        throw errorMessage;
      }

      const course = await db.course.create({
        data: {
          ...data,
          branch: {
            connect: {
              name: data.branch,
            },
          },
        },
      });

      const response: BaseResponse<Course> = {
        message: "Course created successfully",
        data: course,
      };

      logger.info(response.message, {
        courseId: course.id,
        courseCode: course.code,
        courseName: course.name || "N/A",
      });

      return response;
    } catch (error) {
      logger.error("Failed to create course", error);
      throw error;
    }
  }

  /**
   * Get a single course by ID
   * @param id - Course UUID
   * @returns Course data with related counts
   * @throws Error if course not found
   */
  static async getCourseById(id: string): Promise<BaseResponse<Course>> {
    try {
      const course = await db.course.findUnique({
        where: { id },
      });

      if (!course) {
        const errorMessage = "Course not found";
        logger.warn(errorMessage, { courseId: id });
        throw new Error(errorMessage);
      }

      const response: BaseResponse<Course> = {
        message: "Course fetched successfully",
        data: course,
      };

      logger.info(response.message, {
        courseId: course.id,
        courseCode: course.code,
        courseName: course.name || "N/A",
      });

      return response;
    } catch (error) {
      logger.error("Failed to fetch course", error);
      throw error;
    }
  }

  static async getCoursesByBranch(
    name: string
  ): Promise<BaseResponse<Course[]>> {
    try {
      const courses = await db.course.findMany({
        where: {
          branch: {
            name: {
              equals: name,
              mode: "insensitive",
            },
          },
        },
      });

      const response: BaseResponse<Course[]> = {
        message: "Courses fetched successfully",
        data: courses,
      };

      return response;
    } catch (error) {
      logger.error("Failed to fetch courses by department", error);
      throw error;
    }
  }
}
