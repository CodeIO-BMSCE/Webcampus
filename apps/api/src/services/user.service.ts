import { auth, fromNodeHeaders } from "@webcampus/auth";
import { BaseResponse } from "@webcampus/backend-utils/helpers";
import { logger } from "@webcampus/common/logger";
import { CreateUserType } from "@webcampus/schemas";
import { Request } from "express";

/**
 * Custom User Service for Better Auth Integration
 *
 * This service provides a temporary workaround for a limitation in Better Auth's
 * Admin API, which currently does **not support** creating users with a `username` field
 * via the `createUser` method.
 *
 * In our system, the `username` field is essential, especially for student users,
 * where it serves as the USN (University Student Number) and is required during login.
 *
 * To handle this, we first register the user using the `signUpEmail` method which allows
 * providing a username, and then assign roles separately via the Admin API.
 *
 * Once Better Auth supports `username` in the `createUser` endpoint directly,
 * this service and its usage (controllers, routes, etc.) should be deprecated,
 * and user creation should be done directly from the frontend using the Admin API.
 */
export class User {
  private body: CreateUserType;
  private req: Request;
  private userId: string | null = null;

  constructor(req: Request) {
    this.req = req;
    this.body = req.body;
  }

  /**
   * Main method to create a user.
   *
   * Delegates to `createStudent` if the user is a student,
   * otherwise uses the Admin API directly.
   *
   * @returns {Promise<BaseResponse<null>>} A base response containing a success message.
   */
  async create(): Promise<BaseResponse<null>> {
    try {
      if (this.body.role === "student") {
        return await this.createStudent();
      } else {
        return await this.createUserWithAdminAPI();
      }
    } catch (err) {
      logger.error("User creation failed:", err);
      throw new Error("User creation failed.");
    }
  }

  /**
   * Handles the student-specific creation flow:
   * - Uses signUpEmail to register with username
   * - Assigns role with Admin API
   *
   * @returns {Promise<BaseResponse<null>>}
   */
  private async createStudent(): Promise<BaseResponse<null>> {
    try {
      await this.createUserWithUsername();
      await this.updateUserRole();
      return {
        message: "Student created successfully.",
      };
    } catch (error) {
      logger.error("Failed to create student user:", error);
      throw new Error("Failed to create student user.");
    }
  }

  /**
   * Uses `signUpEmail` API to create a user with a `username`.
   * Saves the returned user ID for later role assignment.
   *
   * @throws {Error} if sign-up fails
   */
  private async createUserWithUsername() {
    try {
      const { user } = await auth.api.signUpEmail({
        body: this.body,
      });
      this.userId = user.id;
      logger.info("Student USN reated using signUpEmail: ", user);
    } catch (error) {
      logger.error("signUpEmail failed:", error);
      throw new Error("Failed to sign up user with username.");
    }
  }

  /**
   * Updates the role of the user via Admin API.
   * Falls back to deleting the user if role update fails.
   *
   * @throws {Error} if role update or user deletion fails
   */
  private async updateUserRole() {
    if (!this.userId) {
      throw new Error("User ID not found. Cannot assign role.");
    }
    try {
      const { user } = await auth.api.setRole({
        headers: fromNodeHeaders(this.req.headers),
        body: {
          userId: this.userId,
          role: this.body.role,
        },
      });
      logger.info("User Role updated using Admin API: ", user);
    } catch (error) {
      /**
       * TODO: Check whether this works or not
       */
      await auth.api.deleteUser({
        headers: fromNodeHeaders(this.req.headers),
        body: {
          password: this.body.password,
        },
      });
      logger.error("Failed to update user role:", error);
      throw new Error("Failed to assign role to user.");
    }
  }

  /**
   * Creates a non-student user using Better Auth Admin API.
   *
   * @returns {Promise<BaseResponse<null>>} Success message
   * @throws {Error} if creation fails
   */
  private async createUserWithAdminAPI(): Promise<BaseResponse<null>> {
    try {
      const { user } = await auth.api.createUser({
        headers: fromNodeHeaders(this.req.headers),
        body: this.body,
      });
      logger.info("User Created using Admin API: ", user);
      return {
        message: `${this.body.role} created successfully`,
      };
    } catch (error) {
      logger.error("createUser via admin API failed:", error);
      throw new Error("Failed to create user via admin API.");
    }
  }
}
