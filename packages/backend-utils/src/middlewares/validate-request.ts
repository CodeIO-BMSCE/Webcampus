import { logger } from "@webcampus/common/logger";
import type { NextFunction, Request, Response } from "express";
import type { z, ZodType } from "zod";
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
        error: formatZodErrors(result.error.issues),
      });
    }

    req[source] = result.data;
    next();
  };

function formatZodErrors(issues: z.core.$ZodIssue[]) {
  return issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}
