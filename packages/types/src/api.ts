import type { Response } from "express";

/**
 * Generic interface for consistent API responses.
 *
 * @template T - The type of the response `data` payload.
 */
export interface BaseResponse<T> {
  /** Human-readable message about the result */
  message: string;

  /** Optional payload data */
  data?: T;

  /** Optional error object or message */
  error?: unknown;
}

/**
 * Extended interface for sending structured HTTP responses.
 *
 * @template T - The type of the response `data` payload.
 */
export interface SendResponseParmas<T> extends BaseResponse<T> {
  /** Express Response object */
  res: Response;

  /** HTTP status code */
  statusCode: number;
}

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
