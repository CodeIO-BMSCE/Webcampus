import { EmailSignIn } from "@/modules/auth/sign-in/email/email-sign-in-view";
import { UsernameSignIn } from "@/modules/auth/sign-in/username/username-sign-in-view";
import { roles } from "@webcampus/types/rbac";
import { notFound } from "next/navigation";
import React from "react";
import z from "zod";

const SignInPage = async ({
  params,
}: {
  params: Promise<{ role: string }>;
}) => {
  const roleSchema = z.object({
    role: z.enum(roles),
  });
  const { data, success } = await roleSchema.safeParseAsync(await params);

  if (!success) {
    notFound();
  }

  if (data.role === "student") {
    return <UsernameSignIn />;
  } else {
    return <EmailSignIn />;
  }
};

export default SignInPage;
