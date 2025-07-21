import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center space-y-4 py-12">
      <Image
        width={60}
        height={60}
        src={"/bmsce.svg"}
        alt="BMSCE Logo"
        className="h-16 w-16"
      />
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Access Denied
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          You do not have permission to view this page
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        prefetch={false}
      >
        Go to Homepage
      </Link>
    </div>
  );
}
