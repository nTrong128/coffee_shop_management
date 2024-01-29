"use client";

import {Menu, MoonStar} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [state, setState] = useState(false);
  const menus = [
    {title: "Trang chủ", path: "/login"},
    {title: "Blog", path: "/login"},
    {title: "Về chúng tôi", path: "/login"},
    {title: "Liên hệ", path: "/login"},
  ];
  return (
    <header>
      <nav className="bg-white m-2 border-b rounded-xl md:border-0">
        <div className="items-center justify-between px-4 md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h1 className="text-3xl font-bold text-sky-900">CMS - Coffee Shop Management</h1>
            </Link>
            <div className="">
              <button className="text-gray-700 outline-none p-2 rounded-md md:hidden focus:border-gray-400 focus:border" onClick={() => setState(!state)}>
                <Menu />
              </button>
            </div>
          </div>
          <div className={`flex justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"}`}>
            <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {menus.map((item, idx) => (
                <li key={idx} className="text-gray-600 hover:text-indigo-600">
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoonStar />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mx-2">
                    <div className="p-2">
                      <Link href="/login">Giao diện sáng</Link>
                    </div>
                    <div className="p-2">
                      <Link href="/login">Giao diện tối</Link>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
