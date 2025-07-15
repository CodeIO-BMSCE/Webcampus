import type { Response } from "express";

type SendResponseProps<T> = {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
};

export const sendResponse = <T>({
  res,
  statusCode,
  message,
  data,
}: SendResponseProps<T>) => {
  return res
    .send({
      message,
      data,
    })
    .status(statusCode);
};
