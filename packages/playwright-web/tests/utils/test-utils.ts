import { Page } from "@playwright/test";
import { Role } from "@webcampus/types/rbac";

/**
 * Navigate to a specific role's sign-in page
 */
export async function navigateToSignIn(page: Page, role: Role): Promise<void> {
  await page.goto(`http://localhost:3000/${role}/sign-in`);
}

/**
 * Sign in with provided credentials
 */
export async function signIn(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Continue" }).click();
}

/**
 * Wait for toast notification and verify its content
 */
export async function expectToast(
  page: Page,
  messageRegex: RegExp
): Promise<void> {
  await page.waitForSelector(".Toastify__toast-body");
  await page.waitForFunction((regex) => {
    const toasts = document.querySelectorAll(".Toastify__toast-body");
    return Array.from(toasts).some((toast) =>
      new RegExp(regex).test(toast.textContent || "")
    );
  }, messageRegex.source);
}
