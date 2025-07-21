import type { Metadata } from "next";
import "@webcampus/ui/globals.css";
import { QueryClientProvider } from "@/modules/providers/query-client-provider";
import { ThemeProvider } from "@webcampus/ui/providers/theme-provider";
import { Manrope } from "next/font/google";
import { ToastContainer } from "react-toastify";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BMSCE - Webcampus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <ThemeProvider>
          <ToastContainer
            hideProgressBar
            toastStyle={{
              borderStyle: "var(--tw-border-style)",
              borderWidth: "1px",
              boxShadow: "none",
            }}
          />
          <QueryClientProvider>{children}</QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
