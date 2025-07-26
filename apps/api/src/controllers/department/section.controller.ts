import { Section } from "@webcampus/api/src/services/department/section.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import {
  CreateSectionType,
  SectionQueryType,
} from "@webcampus/schemas/department";
import { Request, Response } from "express";

/**
 * Create a new section
 */
export const createSection = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const request: CreateSectionType = req.body;
    const { message, data } = await Section.create(request);
    sendResponse({
      res,
      message,
      data,
      statusCode: 201,
    });
  } catch (error) {
    logger.error({ error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Get all sections
 */
export const getAllSections = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query: SectionQueryType = req.query;
    const { message, data } = await Section.getAll(query);
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error({ error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Get a section by ID
 */
export const getSectionById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await Section.getById(req.params.id);
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 200 : 404,
    });
  } catch (error) {
    logger.error("Error retrieving section:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Delete a section
 */
export const deleteSection = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message } = await new Section().delete(req.params.id);
    sendResponse({
      res,
      message,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error deleting section:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};
