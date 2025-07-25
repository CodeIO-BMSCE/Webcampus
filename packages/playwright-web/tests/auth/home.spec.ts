import { expect, test } from "@playwright/test";
import { roles } from "@webcampus/types/rbac";
import { capitalize } from "@webcampus/ui/lib/utils";

test.describe("Home page", () => {
  test("Home page displays all layout and auth elements", async ({ page }) => {
    await page.goto("/");
    const logo = page.locator('img[alt="Bmsce Logo"]');
    await expect(logo).toBeVisible();
    await expect(page.getByRole("link", { name: /BMSCE/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /BMSCE CAMPUS/i })
    ).toBeVisible();
    await expect(
      page.getByText(/Sign in with your personal credentials/i)
    ).toBeVisible();
    for (const role of roles) {
      const buttonText = `${capitalize(role)} Sign In`;
      await expect(page.getByRole("link", { name: buttonText })).toBeVisible();
      const link = page.getByRole("link", { name: buttonText });
      await expect(link).toHaveAttribute("href", `/${role}/sign-in`);
    }
    const heroImage = page.locator(
      'img[src*="auth-hero-home.svg"], img[src*="auth-hero.svg"]'
    );
    await expect(heroImage.first()).toBeVisible();
  });
});
