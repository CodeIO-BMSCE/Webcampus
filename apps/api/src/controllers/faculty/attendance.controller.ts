import { Attendance } from "@webcampus/api/src/services/faculty/attendance.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { UpdateAttendanceType } from "@webcampus/schemas/faculty";
import { Request, Response } from "express";

export class AttendanceController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const response = await Attendance.create(req.body);
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
      logger.error("Error creating attendance:", { error });
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
      const response = await Attendance.getAll();
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
      logger.error("Error retrieving attendances:", { error });
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
      const response = await Attendance.getById(req.params.id);
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
      logger.error("Error retrieving attendance:", { error });
      sendResponse({
        res,
        status: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }

  static async getByStudentAndCourse(
    req: Request<{ studentId: string; courseId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const response = await Attendance.getByStudentAndCourse(
        req.params.studentId,
        req.params.courseId
      );
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
      logger.error("Error retrieving attendance:", { error });
      sendResponse({
        res,
        status: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }

  static async update(
    req: Request<{ id: string }, UpdateAttendanceType>,
    res: Response
  ): Promise<void> {
    try {
      const response = await Attendance.update(req.params.id, req.body);
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
      logger.error("Error updating attendance:", { error });
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
      const response = await Attendance.delete(req.params.id);
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
      logger.error("Error deleting attendance:", { error });
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
