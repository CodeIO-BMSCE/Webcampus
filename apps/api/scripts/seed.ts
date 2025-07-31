import "dotenv/config";
import { faker } from "@faker-js/faker";
import { UserService } from "@webcampus/api/src/services/admin/user.service";
import { auth } from "@webcampus/auth";
import { backendEnv } from "@webcampus/common/env";
import { logger } from "@webcampus/common/logger";
import { CreateUserType } from "@webcampus/schemas/admin";

class Seeder {
  private adminAuthToken: string | null = null;

  public async signIn(): Promise<void> {
    const { ADMIN_USER_EMAIL, ADMIN_USER_PASSWORD } = backendEnv();
    try {
      const response = await auth.api.signInEmail({
        body: {
          email: ADMIN_USER_EMAIL,
          password: ADMIN_USER_PASSWORD,
        },
      });
      if (!response.token || !response.user) {
        throw new Error(
          "Sign-in succeeded but expected data (token/user) is missing."
        );
      }
      this.adminAuthToken = response.token;
      logger.info(
        `Admin sign-in successful: ${response.user.name} (${response.user.email})`
      );
    } catch (error) {
      logger.error(`Admin sign-in failed: ${(error as Error).message}`);
      throw error;
    }
  }

  public async createUser(userData: CreateUserType): Promise<void> {
    try {
      const userService = new UserService({
        request: userData,
        headers: {
          Authorization: `Bearer ${this.adminAuthToken}`,
        },
      });
      const user = await userService.create();
      if (user.status === "error") {
        throw new Error(user.message);
      }
      logger.info(`Created admin user: ${userData.name} <${userData.email}>`);
    } catch (error) {
      const errMsg = (error as Error).message || "Unknown error";
      logger.error(`Failed to create admin user ${userData.email}: ${errMsg}`);
      throw error;
    }
  }

  public async seedDepartmentUsers(count: number = 10): Promise<void> {
    try {
      await this.signIn();
      const creationPromises = Array.from({ length: count }, async () => {
        await this.createUser({
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          username: faker.internet.username().toLowerCase(),
          password: "password",
          role: "department",
        });
      });
      await Promise.allSettled(creationPromises);
      logger.info("Admin user seeding process completed.");
    } catch (error) {
      logger.error(`Seeding failed: ${(error as Error).message}`);
      throw error;
    }
  }
}

async function main() {
  const seeder = new Seeder();
  try {
    await seeder.seedDepartmentUsers(10);
  } catch (error) {
    logger.error(`Fatal error in seed script: ${(error as Error).message}`);
    process.exit(1);
  }
}

main();
