import {auth} from "@/auth";
import {EdgeStoreProvider} from "@/lib/edgestore";
import type {Metadata} from "next";
import {SessionProvider} from "next-auth/react";
import {Inter} from "next/font/google";
import {NavBar} from "@/components/dashboard/navbar";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});
export const metadata: Metadata = {
  title: "Hệ thống quản lý quán cà phê",
  description: "Hệ thống quản lý quán cà phê - NextJS 14",
};

interface DashBoardLayoutPros {
  children: React.ReactNode;
}
export default async function DashBoardLayout({children}: DashBoardLayoutPros) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <EdgeStoreProvider>
        <html className="" lang="en">
          <body className={`${inter.className}`}>
            <NavBar />
            <main className=" text-slate-900 bg-cover bg-center bg-no-repeat">
              {children}
            </main>
            <Toaster />
          </body>
        </html>
      </EdgeStoreProvider>
    </SessionProvider>
  );
}
