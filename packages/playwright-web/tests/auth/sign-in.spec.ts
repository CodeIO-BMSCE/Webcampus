import { expect } from "@playwright/test";
import { test } from "../fixtures/auth";

test.describe("Sign in page", () => {
  test("should sign in as admin successfully", async ({
    page,
    adminCredentials,
  }) => {
    await page.goto("/admin/sign-in");
    await expect(
      page.getByRole("heading", { name: /Admin sign in/i })
    ).toBeVisible();
    await page
      .locator('input[placeholder="Enter your email"]')
      .fill(adminCredentials.email);
    await page
      .locator('input[placeholder="Enter your password"]')
      .fill(adminCredentials.password);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForURL("**/admin/dashboard");
    await expect(page.url()).toContain("/admin/dashboard");
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/admin/sign-in");
    await page
      .locator('input[placeholder="Enter your email"]')
      .fill("invalid@example.com");
    await page
      .locator('input[placeholder="Enter your password"]')
      .fill("wrongpassword");
    await page.getByRole("button", { name: "Continue" }).click();
  });

  test("should redirect admin to 403 page when accessing another role's dashboard", async ({
    page,
    authenticatedAsAdmin,
  }) => {
    await authenticatedAsAdmin();
    await page.goto("/student/dashboard");
    await expect(
      page.getByRole("heading", { name: /Access Denied/i })
    ).toBeVisible();
    await expect(
      page.getByText(/You do not have permission to view this page/i)
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Go to Homepage/i })
    ).toBeVisible();
    await expect(page.url()).toContain("/");
  });
});
