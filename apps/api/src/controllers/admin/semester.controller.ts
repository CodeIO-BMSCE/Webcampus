import { SemesterService } from "@webcampus/api/src/services/admin/semester.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import {
  CreateSemesterType,
  SemesterQueryType,
} from "@webcampus/schemas/admin";
import { UUIDType } from "@webcampus/schemas/common";
import { Request, Response } from "express";

export class SemesterController {
  static async create(req: Request, res: Response) {
    try {
      const request: CreateSemesterType = req.body;
      const semester = await SemesterService.create(request);
      return sendResponse({
        res,
        statusCode: 201,
        message: semester.message,
        data: semester.data,
      });
    } catch (error) {
      logger.error({ error });
      return sendResponse({
        res,
        statusCode: 500,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }
  static async getAll(req: Request, res: Response) {
    try {
      const request: SemesterQueryType = req.query;
      const semester = await SemesterService.getAll(request);
      return sendResponse({
        res,
        statusCode: 200,
        message: semester.message,
        data: semester.data,
      });
    } catch (error) {
      logger.error({ error });
      return sendResponse({
        res,
        statusCode: 500,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const request: UUIDType = req.body;
      const semester = await SemesterService.delete(request);
      return sendResponse({
        res,
        statusCode: 200,
        message: semester.message,
        data: semester.data,
      });
    } catch (error) {
      logger.error({ error });
      return sendResponse({
        res,
        statusCode: 500,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }
}
