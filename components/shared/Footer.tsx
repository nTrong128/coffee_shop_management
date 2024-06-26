import Link from "next/link";
import React from "react";
import {FaFacebookSquare, FaGithub, FaLinkedin} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto  lg:justify-between">
        <div className="flex flex-wrap justify-center">
          <ul className="flex items-center justify-between sm:space-x-4 space-x-10 ">
            <li>
              <Link href={"/"}>Trang chủ</Link>
            </li>
            <li>
              <Link href={"/#contact"}>Liên hệ</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center space-x-4 mt-4 lg:mt-0 text-4xl">
          <Link
            className="px-4"
            target="_blank"
            href={"https://www.facebook.com/n.trong128"}>
            <FaFacebookSquare />
          </Link>

          <Link
            className="px-4"
            target="_blank"
            href={"https://www.linkedin.com/in/ntrong128/"}>
            <FaLinkedin />
          </Link>
          <Link
            className="px-4"
            target="_blank"
            href={"https://github.com/nTrong128"}>
            <FaGithub />
          </Link>
        </div>
      </div>
      <div className="pb-2">
        <p className="text-center">
          @2024 - Bản quyền thuộc về Lê Nhật Trọng B2106819 - CICT - CTU
        </p>
      </div>
    </footer>
  );
}
