import { expect } from "@playwright/test";
import { test } from "../fixtures/auth";

test.describe("Admin Department Section", () => {
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
    await page.waitForURL("/admin");
    await expect(page.url()).toContain("/admin");
    await page.getByRole("link", { name: /department/i }).click();
    await page.waitForURL("/admin/department");
  });

  test("should display department page components", async ({
    page,
    authenticatedAsAdmin,
  }) => {
    await authenticatedAsAdmin();
    await page.goto("/admin/department");
    await page.waitForLoadState("networkidle");
    await expect(page.url()).toContain("/admin/department");
    await expect(
      page
        .getByRole("heading", { name: "Departments", level: 1 })
        .or(page.getByText("No users found"))
    ).toBeVisible();
    const heading = page.getByRole("heading", {
      name: "Departments",
      level: 1,
    });
    if (await heading.isVisible()) {
      await expect(
        page.getByRole("button", { name: "Create Department" })
      ).toBeVisible();
      await expect(page.locator("table")).toBeVisible();
      await expect(page.locator("table thead th").nth(0)).toHaveText("ID");
      await expect(page.locator("table thead th").nth(1)).toHaveText("Name");
      await expect(page.locator("table thead th").nth(2)).toHaveText("Email");
      await expect(page.locator("table thead th").nth(3)).toHaveText(
        "Email Verified"
      );
    }
  });

  test("should display department data in table", async ({
    page,
    authenticatedAsAdmin,
  }) => {
    await authenticatedAsAdmin();
    await page.goto("/admin/department");
    await page.waitForLoadState("networkidle");
    const dataTable = page.locator("table");
    const rows = dataTable.locator("tbody tr");
    if ((await rows.count()) > 0) {
      const firstRow = rows.first();
      await expect(firstRow.getByRole("cell").nth(0)).toBeVisible();
      await expect(firstRow.getByRole("cell").nth(1)).toBeVisible();
      await expect(firstRow.getByRole("cell").nth(2)).toBeVisible();
    }
  });

  test("should have functional action buttons for departments", async ({
    page,
    authenticatedAsAdmin,
  }) => {
    await authenticatedAsAdmin();
    await page.goto("/admin/department");
    await page.waitForLoadState("networkidle");
    const dataTable = page.locator("table");
    const rows = dataTable.locator("tbody tr");
    if ((await rows.count()) > 0) {
      const firstRowActions = rows
        .first()
        .getByRole("button", { name: "Open menu" });
      await firstRowActions.click();
      await expect(page.getByRole("menu").first()).toBeVisible();
      await expect(
        page.getByRole("menuitem", { name: "Delete" })
      ).toBeVisible();
    }
  });

  test("should navigate back to dashboard from department page", async ({
    page,
    authenticatedAsAdmin,
  }) => {
    await authenticatedAsAdmin();
    await page.goto("/admin/department");
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: /dashboard/i }).click();
    await expect(page.url()).toContain("/admin");
  });
});
