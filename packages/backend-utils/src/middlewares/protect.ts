import { auth, fromNodeHeaders } from "@webcampus/auth";
import type { Permissions } from "@webcampus/auth/rbac";
import { logger } from "@webcampus/common/logger";
import type { Role } from "@webcampus/types/rbac";
import type { NextFunction, Request, Response } from "express";
import { ERRORS } from "../errors";
import { sendResponse } from "../helpers";

interface ProtectParams {
  role?: Role;
  permissions: Partial<Permissions>;
}

/**
 * Middleware to protect routes by checking user authentication and authorization.
 *
 * This middleware first verifies the existence of a valid session using the `auth.api.getSession` method.
 * If a session exists, it further checks whether the user has the required role and/or permissions
 * using the `auth.api.userHasPermission` method.
 *
 * If authentication or authorization fails, it returns the appropriate HTTP error response.
 * Otherwise, it calls the `next()` middleware in the Express pipeline.
 *
 * @function protect
 * @param {Object} params - Parameters for protecting the route.
 * @param {Role} [params.role] - Optional required role of the user (e.g., 'admin', 'faculty').
 * @param {Partial<Permissions>} params.permissions - A partial set of required permissions for access.
 *
 * @returns {Function} An Express middleware function (req, res, next) => void.
 *
 * @example
 * app.use(
 *   protect({
 *     role: "admin",
 *     permissions: {
 *       user : ['set-role']
 *     }
 *   })
 * );
 */
export const protect =
  ({ role, permissions }: ProtectParams) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      if (!session?.user) {
        logger.error(ERRORS.UNAUTHENTICATED);
        return sendResponse({
          res,
          statusCode: 401,
          message: ERRORS.UNAUTHORIZED,
        });
      }
      const { success, error } = await auth.api.userHasPermission({
        headers: fromNodeHeaders(req.headers),
        body: {
          role,
          permissions,
        },
      });
      if (!success) {
        logger.error(ERRORS.FORBIDDEN);
        sendResponse({
          res,
          statusCode: 403,
          message: ERRORS.FORBIDDEN,
          error,
        });
        return;
      }

      next();
    } catch (error) {
      logger.error("Authorization error:", error);
      sendResponse({
        res,
        statusCode: 500,
        message: "Internal server error during authorization",
      });
      return;
    }
  };
