"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {UserButton} from "@/components/auth/user-button";
import {useCurrentUser} from "@/hooks/use-current-user";
export const NavBar = () => {
  const pathname = usePathname();
  const user = useCurrentUser();
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
        <Button
          asChild
          variant={pathname === "/customer" ? "default" : "outline"}>
          <Link href="/customer">Khánh hàng</Link>
        </Button>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <p>Xin chào, {user?.name}</p>
        <UserButton />
      </div>
    </nav>
  );
};
