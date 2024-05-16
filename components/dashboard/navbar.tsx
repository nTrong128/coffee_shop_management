"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {UserButton} from "@/components/auth/user-button";
import {useState} from "react";
import {Menu} from "lucide-react";
import {useCurrentUser} from "@/hooks/use-current-user";
import {Role} from "@/types";
export const NavBar = () => {
  const user = useCurrentUser();
  const [state, setState] = useState(false);
  const pathname = usePathname();
  const green = "bg-green-600 text-white hover:bg-green-800";
  const outline =
    "border border-input bg-background text-dark hover:bg-accent hover:text-accent-foreground";
  if (user?.role === Role.USER)
    return (
      <div className="mb-8">
        <nav className="flex items-center shadow-sm p-4 justify-between pb-3 md:pb-5">
          <button
            className="text-gray-700 outline-none p-2 rounded-md xl:hidden focus:border-gray-400 focus:border"
            onClick={() => setState(!state)}>
            <Menu />
          </button>
          <div className="hidden gap-x-2 xl:flex">
            <Button
              asChild
              className={pathname === "/dashboard" ? green : outline}>
              <Link href="/dashboard">Tổng quan</Link>
            </Button>
            <Button asChild className={pathname === "/menu" ? green : outline}>
              <Link href="/menu">Tạo đơn</Link>
            </Button>
            <Button
              asChild
              className={pathname === "/product" ? green : outline}>
              <Link href="/product">Quản Lý Món</Link>
            </Button>
            <Button
              asChild
              className={pathname === "/product-type" ? green : outline}>
              <Link href="/product-type">Quản Lý Loại</Link>
            </Button>
            <Button asChild className={pathname === "/spend" ? green : outline}>
              <Link href="/spend">Chi tiêu</Link>
            </Button>
            <Button
              asChild
              className={pathname === "/customer" ? green : outline}>
              <Link href="/customer">Khách hàng</Link>
            </Button>
            <Button
              asChild
              className={pathname === "/exchange" ? green : outline}>
              <Link href="/exchange">Đổi thưởng</Link>
            </Button>
            <Button asChild className={pathname === "/order" ? green : outline}>
              <Link href="/order">Hóa đơn</Link>
            </Button>
          </div>
          <UserButton />
        </nav>
        <div
          className={`flex justify-self-center xl:hidden border-b pb-3 mt-8 md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}>
          <ul className="justify-center items-center space-y-4 mx-4">
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/dashboard">Tổng quan </Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/menu">Tạo đơn</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/product">Quản Lý Món</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/product-type">Quản Lý Loại</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/spend">Chi tiêu</Link>
            </li>

            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/customer">Khách hàng</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/exchange">Đổi thưởng</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/order">Hóa đơn</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  if (user?.role === Role.ADMIN)
    return (
      // <nav className=" flex items-center p-4 shadow-sm bg-white m-2 rounded-sm justify-between border-b">
      <div className="mb-8">
        <nav className="flex items-center shadow-sm p-4 justify-between pb-3 md:pb-5">
          <button
            className="text-gray-700 outline-none p-2 rounded-md xl:hidden focus:border-gray-400 focus:border"
            onClick={() => setState(!state)}>
            <Menu />
          </button>
          <div className="hidden gap-x-2 xl:flex">
            <Button
              asChild
              className={pathname === "/dashboard" ? green : outline}>
              <Link href="/dashboard">Tổng Quan</Link>
            </Button>
            <Button asChild className={pathname === "/menu" ? green : outline}>
              <Link href="/menu">Tạo đơn</Link>
            </Button>
            <Button
              asChild
              className={pathname === "/product" ? green : outline}>
              <Link href="/product">Quản Lý Món</Link>
            </Button>
            <Button
              asChild
              className={pathname === "/product-type" ? green : outline}>
              <Link href="/product-type">Quản Lý Loại</Link>
            </Button>
            <Button asChild className={pathname === "/spend" ? green : outline}>
              <Link href="/spend">Chi tiêu</Link>
            </Button>
            <Button
              asChild
              className={pathname === "/customer" ? green : outline}>
              <Link href="/customer">Khách hàng</Link>
            </Button>
            <Button
              asChild
              className={pathname === "/exchange" ? green : outline}>
              <Link href="/exchange">Đổi thưởng</Link>
            </Button>
            <Button asChild className={pathname === "/order" ? green : outline}>
              <Link href="/order">Hóa đơn</Link>
            </Button>
            <Button
              asChild
              className={pathname === "/position" ? green : outline}>
              <Link href="/position">Chức vụ</Link>
            </Button>
            <Button asChild className={pathname === "/user" ? green : outline}>
              <Link href="/user">Nhân Viên</Link>
            </Button>
          </div>
          <UserButton />
        </nav>
        <div
          className={`flex justify-self-center xl:hidden border-b pb-3 mt-8 md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}>
          <ul className="justify-center items-center space-y-4 mx-4">
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/dashboard">Tổng Quan</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/menu">Tạo đơn</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/product">Quản Lý Món</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/product-type">Quản Lý Loại</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/spend">Chi tiêu</Link>
            </li>

            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/customer">Khách hàng</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/exchange">Đổi thưởng</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/order">Hóa đơn</Link>
            </li>
            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/position">Chức vụ</Link>
            </li>

            <li
              className="mx-4 hover:text-indigo-600 "
              onClick={() => setState(false)}>
              <Link href="/user">Nhân Viên</Link>
            </li>
          </ul>
        </div>
      </div>
    );
};
