import { logger } from "@webcampus/common/logger";
import type { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { sendResponse } from "../helpers";

type RequestPart = "body" | "query" | "params";

/**
 * Middleware to validate incoming Express requests using a Zod schema.
 *
 * Supports validation of request `body`, `query`, or `params` by defaulting to `body`.
 * If validation fails, returns a 400 Bad Request response with a formatted error payload.
 *
 * @function validateRequest
 * @param {ZodType} schema - The Zod schema used to validate the request data.
 * @param {RequestPart} [source="body"] - The part of the request to validate (body, query, or params).
 *
 * @returns {Function} Express middleware function to perform validation.
 *
 * @example
 * router.post("/login", validateRequest(loginSchema), loginHandler);
 */
export const validateRequest =
  (schema: ZodType, source: RequestPart = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    logger.info("Validating request", {
      path: req.path,
      source,
      data: req[source],
    });
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      logger.error("Validation error", {
        path: req.path,
        source,
        issues: result.error.issues,
      });

      return sendResponse({
        res,
        statusCode: 400,
        message: "Validation failed",
        error: result.error.issues.map((issue) => issue.message).join(", "),
      });
    }

    Object.assign(req[source], result.data);
    next();
  };
