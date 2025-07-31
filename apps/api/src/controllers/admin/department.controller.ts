import { IncomingHttpHeaders } from "http";
import { DepartmentService } from "@webcampus/api/src/services/admin/department.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { CreateUserType } from "@webcampus/schemas/admin";
import { CreateDepartmentDTO } from "@webcampus/schemas/department";
import { Request, Response } from "express";

export class DepartmentController {
  static async getDepartments(req: Request, res: Response): Promise<void> {
    try {
      const response = await DepartmentService.getDepartments();
      if (response.status === "success") {
        sendResponse({
          res,
          statusCode: 200,
          status: "success",
          message: response.message,
          data: response.data,
        });
      }
    } catch (error) {
      logger.error("Error Getting Departments", error);
      sendResponse({
        res,
        status: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateDepartmentDTO &
        CreateUserType & { headers: IncomingHttpHeaders } = req.body;
      const response = await DepartmentService.create(request);
      if (response.status === "success") {
        sendResponse({
          res,
          status: "success",
          statusCode: 201,
          message: response.message,
          data: response.data,
        });
      }
    } catch (error) {
      logger.error("Error Creating Department with User", error);
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
