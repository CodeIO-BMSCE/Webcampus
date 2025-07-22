import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { UpdateSectionType } from "@webcampus/schemas";
import { Request, Response } from "express";
import { Section } from "../services/section.service";

/**
 * Create a new section
 */
export const createSection = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Section().create(req.body);
    sendResponse({
      res,
      message,
      data,
      statusCode: 201,
    });
  } catch (error) {
    logger.error("Error creating section:", { error });
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
    const { message, data } = await new Section().getAll();
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error retrieving sections:", { error });
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
    const { message, data } = await new Section().getById(req.params.id);
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
 * Get sections by branch ID
 */
export const getSectionsByBranchId = async (
  req: Request<{ branchId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Section().getByBranchId(
      req.params.branchId
    );
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error retrieving branch's sections:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Update a section
 */
export const updateSection = async (
  req: Request<{ id: string }, UpdateSectionType>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Section().update(
      req.params.id,
      req.body
    );
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error updating section:", { error });
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
