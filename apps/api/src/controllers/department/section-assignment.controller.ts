import { SectionAssignment } from "@webcampus/api/src/services/department/section-assignment.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { UpdateSectionAssignmentType } from "@webcampus/schemas/department";
import { Request, Response } from "express";

export class SectionAssignmentController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const response = await SectionAssignment.create(req.body);
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
      logger.error("Error creating section assignment:", { error });
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
      const response = await SectionAssignment.getAll();
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
      logger.error("Error retrieving section assignments:", { error });
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
      const response = await SectionAssignment.getById(req.params.id);
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
      logger.error("Error retrieving section assignment:", { error });
      sendResponse({
        res,
        status: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }

  static async getBySectionId(
    req: Request<{ sectionId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const response = await SectionAssignment.getBySectionId(
        req.params.sectionId
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
      logger.error("Error retrieving assignments by section:", { error });
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
    req: Request<{ id: string }, UpdateSectionAssignmentType>,
    res: Response
  ): Promise<void> {
    try {
      const response = await SectionAssignment.update(req.params.id, req.body);
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
      logger.error("Error updating section assignment:", { error });
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
      const response = await SectionAssignment.delete(req.params.id);
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
      logger.error("Error deleting section assignment:", { error });
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
