import { SectionAssignment } from "@webcampus/api/src/services/department/section-assignment.service";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { UpdateSectionAssignmentType } from "@webcampus/schemas/department";
import { Request, Response } from "express";

export const createSectionAssignment = async (req: Request, res: Response) => {
  try {
    const { message, data } = await new SectionAssignment().create(req.body);
    sendResponse({ res, message, data, statusCode: 201 });
  } catch (error) {
    logger.error("Error creating section assignment:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const getAllSectionAssignments = async (req: Request, res: Response) => {
  try {
    const { message, data } = await new SectionAssignment().getAll();
    sendResponse({ res, message, data, statusCode: 200 });
  } catch (error) {
    logger.error("Error retrieving section assignments:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const getSectionAssignmentById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { message, data } = await new SectionAssignment().getById(
      req.params.id
    );
    sendResponse({ res, message, data, statusCode: data ? 200 : 404 });
  } catch (error) {
    logger.error("Error retrieving section assignment:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const getSectionAssignmentsBySectionId = async (
  req: Request<{ sectionId: string }>,
  res: Response
) => {
  try {
    const { message, data } = await new SectionAssignment().getBySectionId(
      req.params.sectionId
    );
    sendResponse({ res, message, data, statusCode: 200 });
  } catch (error) {
    logger.error("Error retrieving assignments by section:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const updateSectionAssignment = async (
  req: Request<{ id: string }, UpdateSectionAssignmentType>,
  res: Response
) => {
  try {
    const { message, data } = await new SectionAssignment().update(
      req.params.id,
      req.body
    );
    sendResponse({ res, message, data, statusCode: 200 });
  } catch (error) {
    logger.error("Error updating section assignment:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};

export const deleteSectionAssignment = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { message } = await new SectionAssignment().delete(req.params.id);
    sendResponse({ res, message, statusCode: 200 });
  } catch (error) {
    logger.error("Error deleting section assignment:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};
