import { UserService } from "@webcampus/api/src/services/admin/user.service";
import { auth, fromNodeHeaders } from "@webcampus/auth";
import { ERRORS } from "@webcampus/backend-utils/errors";
import { sendResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { CreateUserType, UsersQueryDTO } from "@webcampus/schemas/admin";
import { Request, Response } from "express";

export class UserController {
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
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateUserType = req.body;
      const { message } = await new UserService({
        request,
      }).create();
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
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const request: { userId: string } = req.body;
      const { success } = await auth.api.removeUser({
        headers: fromNodeHeaders(req.headers),
        body: request,
      });
      if (success) {
        logger.info("Deleted user", {
          userId: request.userId,
        });
        sendResponse({
          res,
          message: "Deleted user",
          statusCode: 200,
        });
      }
    } catch (error) {
      logger.error("Error deleting user:", { error });
      sendResponse({
        res,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const request = req.query as unknown as UsersQueryDTO;
      const { message, data } = await UserService.getUsers(request);
      sendResponse({
        res,
        message,
        statusCode: 200,
        data,
      });
    } catch (error) {
      logger.error({ error });
      sendResponse({
        res,
        message: ERRORS.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        error,
      });
    }
  }
}
