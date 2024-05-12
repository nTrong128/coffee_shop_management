import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Hệ thống quản lý quán cà phê",
  description: "Hệ thống quản lý quán cà phê - NextJS 14",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html className="" lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
