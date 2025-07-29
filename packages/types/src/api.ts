export type SuccessResponse<T> = {
  status: "success";
  message: string;
  data: T | null;
};

export type ErrorResponse = {
  status: "error";
  message: string;
  error: string;
};

/**
 * Generic interface for consistent API responses.
 *
 * @template T - The type of the response `data` payload.
 */
export type BaseResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Input types that allow unknown error but output string error
 */
export type SuccessInputParams<T> = {
  status: "success";
  message: string;
  data: T | null;
};

export type ErrorInputParams = {
  status: "error";
  message: string;
  error: unknown;
};

export type BaseInputParams<T> = SuccessInputParams<T> | ErrorInputParams;
