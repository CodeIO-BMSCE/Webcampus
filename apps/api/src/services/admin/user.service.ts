import { IncomingHttpHeaders } from "http";
import { auth, fromNodeHeaders } from "@webcampus/auth";
import { logger } from "@webcampus/common/logger";
import { db, User } from "@webcampus/db";
import {
  CreateUserType,
  UserResponseType,
  UsersQueryDTO,
} from "@webcampus/schemas/admin";
import { BaseResponse } from "@webcampus/types/api";

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
export class UserService {
  private body: CreateUserType;
  private userId: string | null = null;
  private headers: IncomingHttpHeaders;
  constructor({
    request,
    headers,
  }: {
    request: CreateUserType;
    headers: IncomingHttpHeaders;
  }) {
    this.body = request;
    this.headers = headers;
  }
  /**
   * Main method to create a user.
   *
   * Delegates to `createStudent` if the user is a student,
   * otherwise uses the Admin API directly.
   *
   * @returns {Promise<BaseResponse<null>>} A base response containing a success message.
   */
  async create(): Promise<BaseResponse<Partial<User>>> {
    try {
      if (this.body.role === "student") {
        return await this.createStudent();
      } else {
        return await this.createUserWithAdminAPI();
      }
    } catch (error) {
      logger.error("User creation failed:", error);
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
  private async createStudent(): Promise<BaseResponse<Partial<User>>> {
    try {
      const user = await this.createUserWithUsername();
      await this.updateUserRole();
      return {
        status: "success",
        message: "Student created successfully.",
        data: user,
      };
    } catch (error) {
      logger.error("Failed to create student user:", { error });
      throw new Error("Failed to create student user.");
    }
  }

  /**
   * Uses `signUpEmail` API to create a user with a `username`.
   * Saves the returned user ID for later role assignment.
   *
   * @throws {Error} if sign-up fails
   */
  private async createUserWithUsername(): Promise<Partial<User>> {
    try {
      const { user } = await auth.api.signUpEmail({
        body: this.body,
      });
      this.userId = user.id;
      logger.info("Student USN reated using signUpEmail", { user });
      return user;
    } catch (error) {
      logger.error("signUpEmail failed", { error });
      throw new Error("Failed to sign up user with username.");
    }
  }

  /**
   * Updates the role of the user via Admin API.
   * Falls back to deleting the user if role update fails.
   *
   * @throws {Error} if role update or user deletion fails
   */
  private async updateUserRole(): Promise<void> {
    if (!this.userId) {
      throw new Error("User ID not found. Cannot assign role.");
    }
    try {
      const { user } = await auth.api.setRole({
        body: {
          userId: this.userId,
          role: this.body.role,
        },
        headers: fromNodeHeaders(this.headers),
      });
      logger.info("User Role updated using Admin API", { user });
    } catch (error) {
      logger.error("Failed to update user role", { error });
      throw new Error("Failed to assign role to user.");
    }
  }

  /**
   * Creates a non-student user using Better Auth Admin API.
   *
   * @returns {Promise<BaseResponse<null>>} Success message
   * @throws {Error} if creation fails
   */
  private async createUserWithAdminAPI(): Promise<BaseResponse<Partial<User>>> {
    try {
      const { user } = await auth.api.createUser({
        body: {
          email: this.body.email,
          password: this.body.password,
          name: this.body.name,
          role: this.body.role,
        },
      });
      logger.info("User Created using Admin API ", { user });
      return {
        status: "success",
        message: `${this.body.role} created successfully`,
        data: user,
      };
    } catch (error) {
      logger.error("createUser via admin API failed:", error);
      throw new Error("Failed to create user via admin API.");
    }
  }

  static async getUsers(
    query: UsersQueryDTO
  ): Promise<BaseResponse<UserResponseType[]>> {
    try {
      const users = await db.user.findMany({
        where: {
          ...query,
          role: Array.isArray(query.role)
            ? { in: query.role.map((role) => role.toLowerCase()) }
            : query.role
              ? { equals: query.role.toLowerCase() }
              : undefined,
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          emailVerified: true,
          banned: true,
          banReason: true,
          banExpires: true,
        },
      });
      const response: BaseResponse<UserResponseType[]> = {
        status: "success",
        message: "Users fetched successfully",
        data: users,
      };
      logger.info(response);
      return response;
    } catch (error) {
      logger.error("Failed to get users", { error });
      throw new Error("Failed to get users");
    }
  }
}
