import { auth } from "@webcampus/auth";
import { logger } from "@webcampus/common/logger";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";
import { ERRORS } from "../errors";
import { sendResponse } from "../helpers";

/**
 * Middleware to verify if a user session exists.
 *
 * This function checks for a valid session using `auth.api.getSession()` with headers extracted
 * from the incoming request. If no session is found, it returns a 401 Unauthorized response.
 * If an internal error occurs during the process, it returns a 500 Internal Server Error.
 *
 * @function verifySession
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 *
 * @returns {Promise<void>} Resolves when middleware is complete.
 *
 * @example
 * app.use(verifySession);
 */
export const verifySession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      sendResponse({
        res,
        statusCode: 401,
        message: ERRORS.UNAUTHENTICATED,
      });
      return;
    }
    next();
  } catch (error) {
    logger.error("Session verification error:", { error });
    sendResponse({
      res,
      statusCode: 500,
      message: "Internal server error during authentication",
    });
    return;
  }
};
