"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white p-4">
      <Image
        src="/404-not-found.png"
        alt="Page not found"
        width={800}
        height={600}
        className="hidden max-h-full max-w-full object-contain md:block"
        priority
      />
      <Image
        src="/404-not-found-mobile.png"
        alt="Page not found"
        width={400}
        height={300}
        className="block max-h-full max-w-full object-contain md:hidden"
        priority
      />
    </div>
  );
}
