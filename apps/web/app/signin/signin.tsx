"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, School, User, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // For demo purposes, any USN/password combination works
    router.push("/dashboard");
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
                  BMSCEWebcampus
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Your Gateway to Academic Excellence
                </p>
                <p className="text-sm text-muted-foreground">
                  Access your academic records, course materials, attendance tracking, 
                  and comprehensive student services in one secure platform.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Login Form Side */}
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
                <School className="h-8 w-8 text-primary" />
              </motion.div>
              <CardTitle className="text-2xl font-bold">Student Sign In</CardTitle>
              <CardDescription>
                Access your student portal securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    USN *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your USN (e.g., ABC23DEF456)"
                      value={usn}
                      onChange={(e) => setUsn(e.target.value)}
                      className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm backdrop-blur-sm"
                      required
                    />
                    <span className="text-xs text-muted-foreground mt-1 block">
                      Enter your University Seat Number (10 characters)
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm backdrop-blur-sm"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-border"
                  />
                  <label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Sign In to Portal"
                  )}
                </Button>

                <div className="text-center">
                  <a href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center pt-4 border-t border-border/20">
                  <p className="text-xs text-muted-foreground">
                    Need help accessing your account?<br />
                    Contact: portal@techverse.edu
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
