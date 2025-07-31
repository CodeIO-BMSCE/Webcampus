import { faker } from "@faker-js/faker";
import { auth } from "@webcampus/auth";
import { backendEnv } from "@webcampus/common/env";
import axios from "axios";

const BASE_URL = "http://localhost:8080";
const CREATE_ADMIN_USER_ENDPOINT = "/admin/user";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let adminAuthToken: string | null = null;

async function adminSignIn() {
  const { ADMIN_USER_EMAIL, ADMIN_USER_PASSWORD } = backendEnv();
  console.log(`Attempting admin sign-in with: ${ADMIN_USER_EMAIL}`);

  try {
    const response = await auth.api.signInEmail({
      body: {
        email: ADMIN_USER_EMAIL,
        password: ADMIN_USER_PASSWORD,
      },
    });

    const data = response;
    console.log(
      `Admin sign-in successful. Token obtained for user: ${data.user.name} (${data.user.email})`
    );

    if (data.token) {
      adminAuthToken = data.token;
    } else {
      throw new Error("Login successful but no token received in response.");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Admin sign-in failed: ${error.response.status} - ${JSON.stringify(error.response.data)}`
      );
    } else if (error instanceof Error) {
      console.error(`Admin sign-in failed unexpectedly: ${error.message}`);
    } else {
      console.error(`Admin sign-in failed with unknown error.`);
    }
    process.exit(1);
  }
}

async function createAdminUser(userData: {
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}) {
  if (!adminAuthToken) {
    throw new Error(
      "Admin authentication token is missing. Login must succeed first."
    );
  }

  try {
    console.log(
      `Creating new admin user: ${userData.name} (${userData.email})`
    );
    await api.post(CREATE_ADMIN_USER_ENDPOINT, userData, {
      headers: {
        Authorization: `Bearer ${adminAuthToken}`,
      },
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Failed to create admin user ${userData.email}: ${error.response.status} - ${JSON.stringify(error.response.data)}`
      );
    } else if (error instanceof Error) {
      console.error(
        `Failed to create admin user ${userData.email} unexpectedly: ${error.message}`
      );
    } else {
      console.error(
        `Failed to create admin user ${userData.email} with unknown error.`
      );
    }
  }
}

async function main() {
  console.log("Starting seed script...");

  try {
    await adminSignIn();

    const numberOfAdminsToCreate = 10;
    const adminCreationPromises = Array.from({
      length: numberOfAdminsToCreate,
    }).map(async () => {
      const generatedPassword = "password";
      const generatedEmail = faker.internet.email().toLowerCase();
      const generatedName = faker.person.fullName();
      const generatedUsername = faker.internet.username().toLowerCase();

      await createAdminUser({
        email: generatedEmail,
        password: generatedPassword,
        name: generatedName,
        username: generatedUsername,
        role: "admin",
      });
    });

    await Promise.all(adminCreationPromises);

    console.log("Seed script finished.");
  } catch (e: unknown) {
    console.error(
      "Seed script encountered a fatal error:",
      e instanceof Error ? e.message : "Unknown error"
    );
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
