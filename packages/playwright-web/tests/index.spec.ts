import { expect, test } from "@playwright/test";
import { roles } from "@webcampus/types/rbac";
import { capitalize } from "@webcampus/ui/lib/utils";

test("Home page displays all role sign-in buttons", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(
    page.getByRole("heading", { name: /BMSCE CAMPUS/i })
  ).toBeVisible();
  for (const role of roles) {
    const buttonText = `${capitalize(role)} Sign In`;
    await expect(page.getByRole("link", { name: buttonText })).toBeVisible();
  }
});
