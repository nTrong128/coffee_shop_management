"use client";

import { Menu, MoonStar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Image from "next/image";

export default function Header() {
  const [state, setState] = useState(false);
  const menus = [
    { title: "Truy cập vào hệ thống", path: "/login" },
    { title: "Liên hệ", path: "#contact" },
  ];
  return (
    <header>
      <nav className="bg-white m-2 border-b rounded-xl md:border-0">
        <div className="items-center justify-between px-4 md:flex md:px-8">
          <div className="flex items-center justify-between pb-3 md:pb-5 md:block">
            <Link href="/" className="flex items-center">
              <Image
                loading="lazy"
                alt="Logo"
                height={100}
                src={"/images/logo.svg"}
                width={100}
              />
              <h1 className="text-3xl font-bold text-sky-900">C M S</h1>
            </Link>
            <div>
              <button
                className="text-gray-700 outline-none p-2 rounded-md md:hidden focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                <Menu />
              </button>
            </div>
          </div>
          <div
            className={`flex justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? "block" : "hidden"
            }`}
          >
            <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {menus.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-600 mx-4 hover:text-indigo-600 first:font-bold"
                >
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))}
              {/* //TODO: ADD DARK AND LIGHT HERE */}
              {/* <li>
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
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
