import type { Metadata } from "next";
import "@webcampus/ui/globals.css";
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
    <html lang="en">
      <body className={manrope.className}>
        <ToastContainer
          toastStyle={{
            borderStyle: "var(--tw-border-style)",
            borderWidth: "1px",
            boxShadow: "none",
          }}
        />
        {children}
      </body>
    </html>
  );
}
