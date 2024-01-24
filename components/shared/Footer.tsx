import Link from "next/link";
import React from "react";
import {FaFacebookSquare, FaGithub, FaLinkedin} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-200">
      <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto  lg:justify-between">
        <div className="flex flex-wrap justify-center">
          <ul className="flex items-center space-x-4">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact US</Link>
            </li>
            {/* <li>
              <Link href={"/terms"}>Terms & Condition</Link>
            </li> */}
          </ul>
        </div>
        <div className="flex justify-center space-x-4 mt-4 lg:mt-0 text-2xl">
          <Link href={"https://www.facebook.com/n.trong128"}>
            <FaFacebookSquare />
          </Link>

          <Link href={"https://www.linkedin.com/in/ntrong128/"}>
            <FaLinkedin />
          </Link>
          <Link href={"https://github.com/nTrong128"}>
            <FaGithub />
          </Link>
        </div>
      </div>
      <div className="pb-2">
        <p className="text-center">@2024 - Bản quyền thuộc về Lê Nhật Trọng B2106819 - CICT - CTU</p>
      </div>
    </footer>
  );
}
