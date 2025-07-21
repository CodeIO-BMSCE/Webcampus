import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { UpdateCourseAssignmentType } from "@webcampus/schemas";
import { Request, Response } from "express";
import { CourseAssignment } from "../services/course-assignment.service";

/**
 * Create a new course assignment
 */
export const createCourseAssignment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseAssignment().create(req.body);
    sendResponse({
      res,
      message,
      data,
      statusCode: 201,
    });
  } catch (error) {
    logger.error("Error creating course assignment:", { error });
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
 * Update a course assignment
 */
export const updateCourseAssignment = async (
  req: Request<{ id: string }, UpdateCourseAssignmentType>,
  res: Response
): Promise<void> => {
  try {
    const { message, data } = await new CourseAssignment().update(
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
    logger.error("Error updating course assignment:", { error });
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
