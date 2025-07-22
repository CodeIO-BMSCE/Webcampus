import { CourseService } from "@/src/services/department/course.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { type UUIDParam } from "@webcampus/schemas/common";
import { CreateCourseDTO } from "@webcampus/schemas/department";
import { Request, Response } from "express";

export class CourseController {
  private CourseService: CourseService;

  constructor() {
    this.CourseService = new CourseService();
  }

  async create(req: Request, res: Response) {
    try {
      const request: CreateCourseDTO = req.body;
      const response = await this.CourseService.createCourse(request);
      sendResponse({
        res,
        statusCode: 201,
        ...response,
      });
    } catch (error) {
      logger.error("Error Creating Course", { error });
      sendResponse({
        res,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
      });
    }
  }

  async getCourseById(req: Request, res: Response) {
    try {
      const request = req.params as UUIDParam;
      const response = await this.CourseService.getCourseById(request.id);
      sendResponse({
        res,
        statusCode: 201,
        ...response,
      });
    } catch (error) {
      logger.error("Error Fetching Course", { error });
      sendResponse({
        res,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
      });
    }
  }
}
