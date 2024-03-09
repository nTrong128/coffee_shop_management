"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {UserButton} from "@/components/auth/user-button";
export const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className=" flex items-center p-4 shadow-sm bg-white m-2 rounded-sm justify-between border-b">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/dashboard" ? "default" : "outline"}>
          <Link href="/dashboard">Tổng Quan</Link>
        </Button>
        <Button asChild variant={pathname === "/order" ? "default" : "outline"}>
          <Link href="/order">Order</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/product" ? "default" : "outline"}>
          <Link href="/product">Quản Lý Món</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/product-type" ? "default" : "outline"}>
          <Link href="/product-type">Quản Lý Loại</Link>
        </Button>
        <Button asChild variant={pathname === "/user" ? "default" : "outline"}>
          <Link href="/user">Nhân Viên</Link>
        </Button>
      </div>

      <UserButton />
    </nav>
  );
};
