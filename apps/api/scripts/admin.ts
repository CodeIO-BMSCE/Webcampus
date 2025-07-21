import "dotenv/config";
import { auth } from "@webcampus/auth";
import { backendEnv } from "@webcampus/common/env";
import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import { APIError } from "better-auth/api";

const {
  ADMIN_USER_NAME,
  ADMIN_USER_EMAIL,
  ADMIN_USER_PASSWORD,
  ADMIN_USER_USERNAME,
} = backendEnv();

/**
 * AdminBootstrap handles one-time creation of the initial admin user.
 *
 * It checks if an admin already exists in the database. If not, it:
 * 1. Creates a user via `auth.api.signUpEmail`
 * 2. Updates the user's role to "admin" in the database
 *
 * This script should be run during first-time deployment to ensure there is an admin user.
 *
 * @example
 * new AdminBootstrap().run();
 */
export class AdminBootstrap {
  private userId: string | null = null;

  /**
   * Checks if any admin user already exists in the database.
   *
   * @returns {Promise<boolean>} `true` if an admin exists, otherwise `false`.
   */
  private async adminExists(): Promise<boolean> {
    try {
      const existingAdmin = await db.user.findFirst({
        where: { role: "admin", email: ADMIN_USER_EMAIL },
      });
      return Boolean(existingAdmin);
    } catch (error) {
      logger.error("Error checking existing admin", { error });
      throw new Error("Error checking existing admin", { cause: error });
    }
  }

  /**
   * Main method to run the bootstrap process.
   * Skips creation if an admin already exists.
   */
  public async run(): Promise<void> {
    const exists = await this.adminExists();
    if (exists) {
      logger.info("Admin user already exists.");
      return;
    }
    const created = await this.createUser();
    if (!created) {
      logger.error("Failed to create admin user.");
      return;
    }
    await this.promoteToAdmin();
  }

  /**
   * Creates a new user using the `signUpEmail` API and stores the userId.
   *
   * @returns {Promise<boolean>} `true` if creation succeeds, otherwise `false`.
   */
  private async createUser(): Promise<boolean> {
    try {
      const response = await auth.api.signUpEmail({
        body: {
          name: ADMIN_USER_NAME,
          email: ADMIN_USER_EMAIL,
          password: ADMIN_USER_PASSWORD,
          username: ADMIN_USER_USERNAME,
        },
      });
      this.userId = response.user.id;
      logger.info("User created:", { user: response.user });
      return true;
    } catch (error) {
      if (error instanceof APIError) {
        logger.error("Sign up error:", { error });
        throw new Error("Sign up error while creating student", {
          cause: error,
        });
      } else {
        logger.error("Unexpected error during sign up:", { error });
        throw new Error("Unexpected error while creating student", {
          cause: error,
        });
      }
    }
  }

  /**
   * Promotes the newly created user to "admin" by updating the DB directly.
   *
   * Logs error and skips if no userId is available.
   */
  private async promoteToAdmin(): Promise<void> {
    if (!this.userId) {
      logger.info("No user ID available. Skipping role update.");
      return;
    }

    try {
      const updatedUser = await db.user.update({
        where: { id: this.userId },
        data: { role: "admin" },
      });
      logger.info(`Admin role assigned successfully to`, { user: updatedUser });
    } catch (error) {
      logger.error({ "Error updating user role": error });
      throw new Error("Error updating user role", { cause: error });
    }
  }
}

(async () => {
  try {
    await new AdminBootstrap().run();
  } catch (error) {
    logger.error("Error during AdminBootstrap:", { error });
  }
})();
