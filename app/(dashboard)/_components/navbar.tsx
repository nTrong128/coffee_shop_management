"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {UserButton} from "@/components/auth/user-button";
export const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center p-4 shadow-sm bg-white m-2 rounded-sm justify-between">
      <div className="flex gap-x-4">
        <Button asChild variant={pathname === "/dashboard" ? "default" : "outline"}>
          <Link href="/dashboard">Tổng Quan</Link>
        </Button>
        <Button asChild variant={pathname === "/server" ? "default" : "outline"}>
          <Link href="/server">Bàn</Link>
        </Button>
        <Button asChild variant={pathname === "/transaction" ? "default" : "outline"}>
          <Link href="/transaction">Giao Dịch</Link>
        </Button>
        <Button asChild variant={pathname === "/user" ? "default" : "outline"}>
          <Link href="/user">Nhân Viên</Link>
        </Button>
      </div>

      <UserButton />
    </nav>
  );
};
