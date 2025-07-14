import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@webcampus/auth/types";
import { frontendEnv } from "@webcampus/common/env";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PAGES = ["/auth/sign-in", "/auth/sign-up"];
const PROTECTED_PAGES = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { data: session } = await betterFetch<Session>(
    `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/api/auth/get-session`,
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const isPublicPage = PUBLIC_PAGES.includes(pathname);
  const isProtectedPage = PROTECTED_PAGES.includes(pathname);

  if (session && isPublicPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && isProtectedPage) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}
