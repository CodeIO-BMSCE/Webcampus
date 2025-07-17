import "dotenv/config";
import { APIError, auth } from "@webcampus/auth";
import { backendEnv } from "@webcampus/common/env";

const env = backendEnv();

class BootstrapService {
  private userId: string | null = null;

  async run() {
    await this.createRootUser();
    if (!this.userId) {
      console.warn("Skipping organisation creation");
      return;
    }
    await this.createOrganisation();
  }

  private async createRootUser() {
    try {
      const { user } = await auth.api.signUpEmail({
        body: {
          name: env.ROOT_USER_NAME,
          email: env.ROOT_USER_EMAIL,
          password: env.ROOT_USER_PASSWORD,
          username: env.ROOT_USER_USERNAME,
        },
      });
      this.userId = user.id;
      console.log("Root user created:", user);
    } catch (err) {
      this.handleError(
        err,
        {
          USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER: () => {
            console.log("Root user already exists.");
          },
        },
        "root user creation"
      );
    }
  }

  private async createOrganisation() {
    try {
      const organisation = await auth.api.createOrganization({
        body: {
          name: env.ORGANISATION_NAME,
          slug: env.ORGANISATION_SLUG,
          userId: this.userId!,
        },
      });

      console.log("Organisation created:", organisation);
    } catch (err) {
      this.handleError(
        err,
        {
          ORGANIZATION_SLUG_ALREADY_EXISTS: () => {
            console.log("Organisation already exists.");
          },
        },
        "organisation creation"
      );
    }
  }

  private handleError(
    error: unknown,
    handlers: Record<string, () => void>,
    context?: string
  ) {
    if (error instanceof APIError) {
      const code = error.body?.code as string;
      const handle = handlers[code];
      if (handle) {
        handle();
        return;
      }
      console.error(`Better-auth error during ${context}:`, code || error);
      throw error;
    } else {
      console.error(`Unexpected error during ${context}:`, error);
      throw error;
    }
  }
}

new BootstrapService().run();
