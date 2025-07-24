import { CourseService } from "@webcampus/api/src/services/department/course.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { StringParam, type UUIDParam } from "@webcampus/schemas/common";
import { CreateCourseDTO } from "@webcampus/schemas/department";
import { Request, Response } from "express";

export class CourseController {
  static async create(req: Request, res: Response) {
    try {
      const request: CreateCourseDTO = req.body;
      logger.debug("Creating Course", request);
      const { message } = await CourseService.createCourse(request);
      sendResponse({
        res,
        statusCode: 201,
        message,
      });
    } catch (error) {
      logger.error("Error Creating Course", error);
      sendResponse({
        res,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
      });
    }
  }

  static async getCourseById(req: Request, res: Response) {
    try {
      const request = req.params as UUIDParam;
      const response = await CourseService.getCourseById(request.id);
      sendResponse({
        res,
        statusCode: 201,
        ...response,
      });
    } catch (error) {
      logger.error("Error Fetching Course", error);
      sendResponse({
        res,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
      });
    }
  }

  static async getCoursesByBranch(req: Request, res: Response) {
    try {
      const request = req.query as StringParam;
      const response = await CourseService.getCoursesByBranch(request.name);
      sendResponse({
        res,
        statusCode: 200,
        ...response,
      });
    } catch (error) {
      logger.error("Error Fetching Courses by Branch", error);
      sendResponse({
        res,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
      });
    }
  }
}
