import {auth} from "@/auth";
import type {Metadata} from "next";
import {SessionProvider} from "next-auth/react";
import {Inter} from "next/font/google";
import {NavBar} from "@/components/dashboard/navbar";

const inter = Inter({subsets: ["latin"]});
export const metadata: Metadata = {
  title: "Coffee Shop Management System",
  description: "Coffee Shop Management System",
};

interface DashBoardLayoutPros {
  children: React.ReactNode;
}
export default async function DashBoardLayout({
  children,
}: DashBoardLayoutPros) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html className="" lang="en">
        <body className={`${inter.className}`}>
          <NavBar />

          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
