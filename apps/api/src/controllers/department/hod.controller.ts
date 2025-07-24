import { HODService } from "@webcampus/api/src/services/department/hod.service";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { StringParam } from "@webcampus/schemas/common";
import { CreateHODDTO, RemoveHODDTO } from "@webcampus/schemas/department";
import { Request, Response } from "express";

export class HODController {
  static async create(req: Request, res: Response) {
    try {
      const request: CreateHODDTO = req.body;
      const response = await HODService.create(request, req.headers);
      sendResponse({
        res,
        statusCode: 201,
        message: response.message,
        data: response.data,
      });
    } catch (error: unknown) {
      logger.error({ error });
      sendResponse({
        res,
        statusCode: 500,
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const params = req.query as StringParam;
      const response = await HODService.get(params.name);
      sendResponse({
        res,
        statusCode: 200,
        message: response.message,
        data: response.data,
      });
    } catch (error: unknown) {
      logger.error({ error });
      sendResponse({
        res,
        statusCode: 500,
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const request: RemoveHODDTO = req.body;
      const response = await HODService.remove(request, req.headers);
      sendResponse({
        res,
        statusCode: 200,
        message: response.message,
        data: response.data,
      });
    } catch (error: unknown) {
      logger.error({ error });
      sendResponse({
        res,
        statusCode: 500,
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
