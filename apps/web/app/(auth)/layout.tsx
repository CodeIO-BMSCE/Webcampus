"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md">
              <Image
                width={50}
                height={50}
                className="h-full w-full"
                src={"/bmsce.svg"}
                alt="Bmsce Logo"
              />
            </div>
            BMSCE
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden h-full w-full lg:block">
        <Image
          fill
          quality={100}
          src={pathname === "/" ? "/auth-hero-home.svg" : "/auth-hero.svg"}
          alt="Background Image"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </div>
  );
};

export default AuthLayout;
