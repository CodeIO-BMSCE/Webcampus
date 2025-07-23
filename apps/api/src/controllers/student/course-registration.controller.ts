import { CourseRegistration } from "@webcampus/api/src/services/student/course-registration.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { UpdateCourseRegistrationType } from "@webcampus/schemas/student";
import { Request, Response } from "express";

/**
 * Create a new course registration
 */
export const createCourseRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseRegistration().create(req.body);
    sendResponse({
      res,
      message,
      data,
      statusCode: 201,
    });
  } catch (error) {
    logger.error("Error creating course registration:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Get all course registrations
 */
export const getAllCourseRegistrations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseRegistration().getAll();
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error retrieving course registrations:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Get a course registration by ID
 */
export const getCourseRegistrationById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseRegistration().getById(
      req.params.id
    );
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 200 : 404,
    });
  } catch (error) {
    logger.error("Error retrieving course registration:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Get course registrations by student ID
 */
export const getCourseRegistrationsByStudentId = async (
  req: Request<{ studentId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseRegistration().getByStudentId(
      req.params.studentId
    );
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error retrieving student's course registrations:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Update a course registration
 */
export const updateCourseRegistration = async (
  req: Request<{ id: string }, UpdateCourseRegistrationType>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseRegistration().update(
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
    logger.error("Error updating course registration:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Delete a course registration
 */
export const deleteCourseRegistration = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message } = await new CourseRegistration().delete(req.params.id);
    sendResponse({
      res,
      message,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error deleting course registration:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};
