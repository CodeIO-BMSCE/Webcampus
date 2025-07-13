"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { School, User, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [usn, setUsn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const usnPattern = /^[0-9]{1}[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;
    if (!usn || !usnPattern.test(usn.toUpperCase())) {
      setError("Please enter a valid USN (e.g., 1BM23CS137)");
      setIsLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Illustration Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col items-center justify-center space-y-6"
        >
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <School className="h-24 w-24 text-primary mx-auto" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BMSCE Webcampus
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Forgot your password? Reset it here and regain access to your account.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reset Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <Card variant="glass" className="backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
              >
                {submitted ? (
                  <MailCheck className="h-8 w-8 text-green-500" />
                ) : (
                  <School className="h-8 w-8 text-primary" />
                )}
              </motion.div>
              <CardTitle className="text-2xl font-bold">
                {submitted ? "Check Your Email" : "Forgot Password"}
              </CardTitle>
              <CardDescription>
                {submitted
                  ? `Reset link sent to the email associated with USN: ${usn}`
                  : "Enter your USN to receive password reset instructions"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {submitted ? (
                <div className="space-y-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn’t receive the email?{" "}
                    <a href="mailto:campus@bmsce.ac.in" className="text-primary underline">
                      Contact support
                    </a>
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setUsn("");
                    }}
                    className="w-full"
                  >
                    Send another reset link
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      USN *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your USN (e.g., 1BM23CS137)"
                      value={usn}
                      onChange={(e) => setUsn(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm backdrop-blur-sm"
                      required
                    />
                    <span className="text-xs text-muted-foreground mt-1 block">
                      University Seat Number should be 10 characters.
                    </span>
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 bg-red-100 rounded px-2 py-1">{error}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </Button>
                  <div className="text-center pt-4 border-t border-border/20">
                    <p className="text-xs text-muted-foreground">
                      Remembered your password?{" "}
                      <a href="/" className="text-primary hover:underline">
                        Back to Sign In
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
