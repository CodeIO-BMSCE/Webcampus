import { SignIn } from "@/modules/auth/sign-in/sign-in-view";
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
  const result = await roleSchema.safeParseAsync(await params);

  if (!result.success) {
    notFound();
  }

  return <SignIn role={result.data.role} />;
};

export default SignInPage;
