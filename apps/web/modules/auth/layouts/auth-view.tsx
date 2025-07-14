import Image from "next/image";
import Link from "next/link";
import React from "react";

export const AuthView = ({ children }: { children: React.ReactNode }) => {
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
      <div className="bg-muted relative hidden items-center justify-center lg:flex">
        <div className="from-primary-foreground to-primary/50 relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-t py-16">
          <div className="from-primary-foreground to-primary/50 absolute inset-0 animate-pulse rounded-full bg-gradient-to-r opacity-5 blur-3xl" />
          <div className="z-10 flex h-full items-center justify-center">
            <div className="bg-accent mx-auto flex h-20 w-20 items-center justify-center rounded-full border shadow-lg">
              <Image
                width={50}
                height={50}
                src="/bmsce.svg"
                alt="BMSCE Logo"
                className="h-12 w-12 object-contain"
              />
            </div>
          </div>
          <div className="z-10 pb-10 text-center">
            <h1 className="text-primary text-3xl font-semibold tracking-tight md:text-4xl">
              BMSCE Webcampus
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
