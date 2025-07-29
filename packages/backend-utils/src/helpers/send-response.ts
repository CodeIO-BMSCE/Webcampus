import {
  BaseInputParams,
  ErrorInputParams,
  ErrorResponse,
  SuccessInputParams,
  SuccessResponse,
} from "@webcampus/types/api";
import type { Response } from "express";

/**
 * Extended interface for sending structured HTTP responses.
 *
 * @template T - The type of the response `data` payload.
 */
export type SendResponseParams<T> = {
  /** Express Response object */
  res: Response;
  /** HTTP status code */
  statusCode: number;
} & BaseInputParams<T>;

/**
 * Sends a structured JSON response using Express.
 *
 * @template T - The type of the response `data` payload.
 * @param {SendResponseParams<T>} params - The parameters used to send the response.
 *
 * @returns {void}
 *
 * @example
 * sendResponse({
 *   res,
 *   statusCode: 200,
 *   status: "success",
 *   message: "User created successfully",
 *   data: user
 * });
 *
 * @example
 * sendResponse({
 *   res,
 *   statusCode: 500,
 *   status: "error",
 *   message: "Something went wrong",
 *   error: new Error("Database connection failed")
 * });
 */
export const sendResponse = <T>(params: SendResponseParams<T>): void => {
  const { res, statusCode, status, message } = params;

  if (status === "success") {
    const { data } = params as SendResponseParams<T> & SuccessInputParams<T>;
    const responseBody: SuccessResponse<T> = { status, message, data };
    res.status(statusCode).json(responseBody);
  } else {
    const { error } = params as SendResponseParams<T> & ErrorInputParams;
    const responseBody: ErrorResponse = {
      status,
      message,
      error: sendResponseError(error),
    };
    res.status(statusCode).json(responseBody);
  }
};

/**
 * Handle error and return a string message
 * @param error - The error to handle
 * @returns A string message
 */
const sendResponseError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
};
