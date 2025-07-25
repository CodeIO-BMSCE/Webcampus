import { CourseAssignment } from "@webcampus/api/src/services/hod/course-assignment.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { CreateCourseAssignmentType } from "@webcampus/schemas/hod";
import { Request, Response } from "express";

/**
 * Create a new course assignment
 */
export const createCourseAssignment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const request: CreateCourseAssignmentType = req.body;
    const { message, data } = await CourseAssignment.create(request);
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
 * Get all course assignments
 */
export const getAllCourseAssignments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseAssignment().getAll();
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error retrieving course assignments:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Get a course assignment by ID
 */
export const getCourseAssignmentById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseAssignment().getById(
      req.params.id
    );
    sendResponse({
      res,
      message,
      data,
      statusCode: data ? 200 : 404,
    });
  } catch (error) {
    logger.error("Error retrieving course assignment:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Get course assignments by faculty ID
 */
export const getCourseAssignmentsByFacultyId = async (
  req: Request<{ facultyId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseAssignment().getByFacultyId(
      req.params.facultyId
    );
    sendResponse({
      res,
      message,
      data,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error retrieving faculty's course assignments:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

/**
 * Delete a course assignment
 */
export const deleteCourseAssignment = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { message } = await new CourseAssignment().delete(req.params.id);
    sendResponse({
      res,
      message,
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error deleting course assignment:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};
