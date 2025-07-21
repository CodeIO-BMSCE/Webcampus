import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { UpdateFacultyType } from "@webcampus/schemas";
import { Request, Response } from "express";
import { Faculty } from "../services/faculty.service";

/**
 * Create a new faculty member
 */
export const createFaculty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Faculty().create(req.body);
    sendResponse({
      res,
      message,
      data,
      statusCode: 201,
    });
  } catch (error) {
    logger.error("Error creating faculty:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Get all faculty members
 */
export const getAllFaculty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Faculty().getAll();
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error retrieving faculties:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Get a faculty member by ID
 */
export const getFacultyById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Faculty().getById(req.params.id);
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 200 : 404,
    });
  } catch (error) {
    logger.error("Error retrieving faculty:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Update a faculty member
 */
export const updateFaculty = async (
  req: Request<{ id: string }, UpdateFacultyType>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Faculty().update(
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
    logger.error("Error updating faculty:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Delete a faculty member
 */
export const deleteFaculty = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message } = await new Faculty().delete(req.params.id);
    sendResponse({
      res,
      message,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error deleting faculty:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};
