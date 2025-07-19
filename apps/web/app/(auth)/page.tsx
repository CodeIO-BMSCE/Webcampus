import { roles } from "@webcampus/types/rbac";
import { Button } from "@webcampus/ui/components/button";
import { capitalize } from "@webcampus/ui/lib/utils";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">BMSCE CAMPUS</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Sign in with your personal credentials
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        {roles.map((role) => (
          <Button key={role} size={"lg"} variant={"outline"}>
            <Link href={`${role}/sign-in`}>{capitalize(role)} Sign In</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
