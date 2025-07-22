import { Role, roles } from "@webcampus/types/rbac";
import { normalize } from "@webcampus/ui/lib/utils";

export const AUTH_ROUTES = roles.map((role) => `/${role}/sign-in`);
export const DASHBOARD_REDIRECTS: Record<Role, string> = Object.fromEntries(
  roles.map((role) => [role, `/${role}/dashboard`])
) as Record<Role, string>;

export const getRoleFromPathname = (pathname: string): Role | null => {
  const clean = normalize(pathname);
  return (
    roles.find(
      (role) => clean === `/${role}` || clean.startsWith(`/${role}/`)
    ) ?? null
  );
};

export const isSignInRoute = (pathname: string): boolean => {
  const clean = normalize(pathname);
  return AUTH_ROUTES.includes(clean);
};
