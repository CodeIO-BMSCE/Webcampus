import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { Request, Response } from "express";
import { User } from "../services/user.service";

/**
 * Express controller to handle user creation.
 *
 * This controller instantiates the `User` service and calls its `create` method.
 * It handles successful responses with a 201 status code and errors with a 500.
 *
 * Once Better Auth supports `username` in the `createUser` api directly,
 * this controller and its usage (routes, etc.) should be deprecated,
 * and user creation should be done directly from the frontend using the Admin API.
 * @function createUser
 * @param {Request} req - Express request object containing user data in `req.body`
 * @param {Response} res - Express response object used to send back the response
 *
 * @returns {Promise<void>} A promise that resolves once the response is sent.
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message } = await new User(req).create();
    sendResponse({
      res,
      message,
      statusCode: 201,
    });
  } catch (error) {
    logger.error("Error creating user:", { error });
    sendResponse({
      res,
      message: ERRORS.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      error,
    });
  }
};
