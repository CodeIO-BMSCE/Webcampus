import { CourseAssignment } from "@webcampus/api/src/services/hod/course-assignment.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { CreateCourseAssignmentType } from "@webcampus/schemas/hod";
import { Request, Response } from "express";

export class CourseAssignmentController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateCourseAssignmentType = req.body;
      const response = await CourseAssignment.create(request);
      if (response.status === "success") {
        sendResponse({
          res,
          status: "success",
          message: response.message,
          data: response.data,
          statusCode: 201,
        });
      }
    } catch (error) {
      logger.error({ error });
      sendResponse({
        res,
        status: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const response = await new CourseAssignment().getAll();
      if (response.status === "success") {
        sendResponse({
          res,
          status: "success",
          message: response.message,
          data: response.data,
          statusCode: 200,
        });
      }
    } catch (error) {
      logger.error("Error retrieving course assignments:", { error });
      sendResponse({
        res,
        status: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }

  static async getById(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    try {
      const response = await new CourseAssignment().getById(req.params.id);
      if (response.status === "success") {
        sendResponse({
          res,
          status: "success",
          message: response.message,
          data: response.data,
          statusCode: response.data ? 200 : 404,
        });
      }
    } catch (error) {
      logger.error("Error retrieving course assignment:", { error });
      sendResponse({
        res,
        status: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }

  static async getByFacultyId(
    req: Request<{ facultyId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const response = await new CourseAssignment().getByFacultyId(
        req.params.facultyId
      );
      if (response.status === "success") {
        sendResponse({
          res,
          status: "success",
          message: response.message,
          data: response.data,
          statusCode: 200,
        });
      }
    } catch (error) {
      logger.error("Error retrieving faculty's course assignments:", { error });
      sendResponse({
        res,
        status: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }

  static async delete(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    try {
      const response = await new CourseAssignment().delete(req.params.id);
      if (response.status === "success") {
        sendResponse({
          res,
          status: "success",
          message: response.message,
          data: response.data,
          statusCode: 200,
        });
      }
    } catch (error) {
      logger.error("Error deleting course assignment:", { error });
      sendResponse({
        res,
        status: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }
}
