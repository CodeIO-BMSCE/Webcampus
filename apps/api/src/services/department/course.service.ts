import { logger } from "@webcampus/common/logger";
import { Course, db, Prisma } from "@webcampus/db";
import { CreateCourseDTO } from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";

export class CourseService {
  static async create(data: CreateCourseDTO): Promise<BaseResponse<Course>> {
    try {
      const { departmentName, ...courseData } = data;
      const course = await db.course.create({
        data: {
          ...courseData,
          department: {
            connect: {
              name: departmentName,
            },
          },
        },
      });

      const response: BaseResponse<Course> = {
        status: "success",
        message: "Course created successfully",
        data: course,
      };
      logger.info(response);
      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Course already exists");
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      logger.error("Failed to create course", error);
      throw new Error("Failed to create course");
    }
  }

  static async getById(id: string): Promise<BaseResponse<Course>> {
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
        status: "success",
        message: "Course fetched successfully",
        data: course,
      };

      logger.info(response);
      return response;
    } catch (error) {
      logger.error("Failed to fetch course", error);
      throw error;
    }
  }

  static async getByBranch(name: string): Promise<BaseResponse<Course[]>> {
    try {
      const courses = await db.course.findMany({
        where: {
          department: {
            name: {
              equals: name,
              mode: "insensitive",
            },
          },
        },
      });

      const response: BaseResponse<Course[]> = {
        status: "success",
        message: "Courses fetched successfully",
        data: courses,
      };
      logger.info(response);
      return response;
    } catch (error) {
      logger.error("Failed to fetch courses by department", error);
      throw error;
    }
  }
}
