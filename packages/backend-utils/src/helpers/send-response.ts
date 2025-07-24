import type { SendResponseParmas } from "@webcampus/types/api";
import type { Response } from "express";

/**
 * Sends a structured JSON response using Express.
 *
 * @template T - The type of the response `data` payload.
 * @param {SendResponseParmas<T>} params - The parameters used to send the response.
 *
 * @returns {Response} The Express response object after sending JSON.
 *
 * @example
 * sendResponse({
 *   res,
 *   statusCode: 200,
 *   message: "User created successfully",
 *   data: user
 * });
 */
export const sendResponse = <T>({
  res,
  statusCode,
  message,
  data,
  error,
}: SendResponseParmas<T>): Response => {
  return res.status(statusCode).json({
    message,
    data,
    error,
  });
};
