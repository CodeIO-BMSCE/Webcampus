import { expect, test } from "../fixtures/auth-fixtures";

test.describe("Department Dashboard", () => {
  // Use the authentication fixture to sign in before tests
  // test.beforeEach(async ({ authenticatedAsDepartment }) => {
  // This will handle the sign-in process
  // });

  test("should display department dashboard", async ({ page }) => {
    // Verify dashboard is loaded
    await expect(page.url()).toContain("/department/dashboard");

    // Check for department dashboard content
    await expect(page.getByText("DepartmentDashboardPage")).toBeVisible();
  });

  test("should navigate to different department sections", async ({ page }) => {
    // Test navigation to different sections (adjust selectors based on your actual UI)
    await page.getByRole("link", { name: /courses/i }).click();
    await expect(page.url()).toContain("/department/courses");

    await page.getByRole("link", { name: /faculty/i }).click();
    await expect(page.url()).toContain("/department/faculty");

    await page.getByRole("link", { name: /student/i }).click();
    await expect(page.url()).toContain("/department/student");

    await page.getByRole("link", { name: /sections/i }).click();
    await expect(page.url()).toContain("/department/sections");
  });
});
