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
      const { message, data } = await DepartmentService.getDepartments();
      sendResponse({
        res,
        statusCode: 200,
        message,
        data,
      });
    } catch (error) {
      logger.error("Error Getting Departments", error);
      sendResponse({
        res,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateDepartmentDTO & CreateUserType = req.body;
      const { message, data } = await DepartmentService.create(request);
      sendResponse({
        res,
        statusCode: 201,
        message,
        data,
      });
    } catch (error) {
      logger.error("Error Creating Department with User", error);
      sendResponse({
        res,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
      });
    }
  }
}
