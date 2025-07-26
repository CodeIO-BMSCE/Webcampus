import { Mark } from "@webcampus/api/src/services/faculty/mark.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { UpdateMarkType } from "@webcampus/schemas/faculty";
import { Request, Response } from "express";

export const createMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Mark().create(req.body);
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 201 : 400,
    });
  } catch (error) {
    logger.error("Error creating mark:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const getAllMarks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Mark().getAll();
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error retrieving marks:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const getMarkById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Mark().getById(req.params.id);
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 200 : 404,
    });
  } catch (error) {
    logger.error("Error retrieving mark:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const getMarkByStudentAndCourse = async (
  req: Request<{ studentId: string; courseId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Mark().getByStudentAndCourse(
      req.params.studentId,
      req.params.courseId
    );
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 200 : 404,
    });
  } catch (error) {
    logger.error("Error retrieving mark:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const updateMark = async (
  req: Request<{ id: string }, UpdateMarkType>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Mark().update(req.params.id, req.body);
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 200 : 404,
    });
  } catch (error) {
    logger.error("Error updating mark:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const deleteMark = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message } = await new Mark().delete(req.params.id);
    sendResponse({
      res,
      message,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error deleting mark:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};
