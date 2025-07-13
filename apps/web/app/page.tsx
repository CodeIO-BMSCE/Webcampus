"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@webcampus/ui/components/button";
import React from "react";

const HomePage = () => {
  const handleSignUp = async () => {
    await authClient.signIn.username(
      {
        password: "password1234",
        username: "hitishrao",
      },
      {
        onRequest: (ctx) => {
          console.log("Signing up...", ctx);
        },
        onSuccess: (ctx) => {
          console.log("Sign up successful", ctx.data);
        },
        onError: (ctx) => {
          alert(JSON.stringify(ctx.error));
        },
      }
    );
  };
  return (
    <div>
      <Button onClick={() => handleSignUp()}>This is a button</Button>
    </div>
  );
};

export default HomePage;
