import { SemesterService } from "@webcampus/api/src/services/admin/semester.service";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { CreateSemesterInput } from "@webcampus/schemas/admin";
import { Request, Response } from "express";

export class SemesterController {
  static async create(req: Request, res: Response) {
    try {
      const request: CreateSemesterInput = req.body;
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
        statusCode: 400,
        message: "Validation failed",
        error: error,
      });
    }
  }
}
