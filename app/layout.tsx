import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Coffee Shop Management System",
  description: "Coffee Shop Management System",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html className="" lang="en">
      <body className={`${inter.className} bg-[#80a4b3]`}>{children}</body>
    </html>
  );
}
