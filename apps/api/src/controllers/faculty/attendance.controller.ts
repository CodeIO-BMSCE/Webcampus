import { Attendance } from "@webcampus/api/src/services/faculty/attendance.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { UpdateAttendanceType } from "@webcampus/schemas/faculty";
import { Request, Response } from "express";

export const createAttendance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Attendance().create(req.body);
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 201 : 400,
    });
  } catch (error) {
    logger.error("Error creating attendance:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const getAllAttendances = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Attendance().getAll();
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error retrieving attendances:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const getAttendanceById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Attendance().getById(req.params.id);
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 200 : 404,
    });
  } catch (error) {
    logger.error("Error retrieving attendance:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const getAttendanceByStudentAndCourse = async (
  req: Request<{ studentId: string; courseId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Attendance().getByStudentAndCourse(
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
    logger.error("Error retrieving attendance:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const updateAttendance = async (
  req: Request<{ id: string }, UpdateAttendanceType>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new Attendance().update(
      req.params.id,
      req.body
    );
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 200 : 404,
    });
  } catch (error) {
    logger.error("Error updating attendance:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const deleteAttendance = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message } = await new Attendance().delete(req.params.id);
    sendResponse({
      res,
      message,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error deleting attendance:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};
