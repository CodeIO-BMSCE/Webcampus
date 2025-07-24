import { test as base } from "@playwright/test";

// import { Role } from '@webcampus/types/rbac';

type AuthFixtures = {
  adminCredentials: { email: string; password: string };
  departmentCredentials: { email: string; password: string };
  authenticatedAsAdmin: void;
  authenticatedAsDepartment: void;
};

export const test = base.extend<AuthFixtures>({
  // Define credentials
  adminCredentials: async (_, use) => {
    await use({
      email: "dev@webcampus.com",
      password: "password",
    });
  },

  departmentCredentials: async (_, use) => {
    await use({
      email: "department.ete@bmsce.ac.in",
      password: "ete@123456",
    });
  },

  // Authentication helpers
  authenticatedAsAdmin: async ({ page, adminCredentials }, use) => {
    // Navigate to admin sign-in page
    await page.goto("http://localhost:3000/admin/sign-in");

    // Fill in credentials - use more specific selectors
    await page
      .locator('input[placeholder="Enter your email"]')
      .fill(adminCredentials.email);
    await page
      .locator('input[placeholder="Enter your password"]')
      .fill(adminCredentials.password);

    // Submit the form
    await page.getByRole("button", { name: "Continue" }).click();

    // Wait for navigation to dashboard
    await page.waitForURL("**/admin/dashboard");

    await use();
  },

  authenticatedAsDepartment: async ({ page, departmentCredentials }, use) => {
    // Navigate to department sign-in page
    await page.goto("http://localhost:3000/department/sign-in");

    // Fill in credentials - use more specific selectors
    await page
      .locator('input[placeholder="Enter your email"]')
      .fill(departmentCredentials.email);
    await page
      .locator('input[placeholder="Enter your password"]')
      .fill(departmentCredentials.password);

    // Submit the form
    await page.getByRole("button", { name: "Continue" }).click();

    // Wait for navigation to dashboard
    await page.waitForURL("**/department/dashboard");

    await use();
  },
});

export { expect } from "@playwright/test";
