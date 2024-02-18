import {Button} from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import dashboardbg from "/public/images/dashboard_bg.png";
import {LogInButton} from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="text-center flex  flex-col text-slate-100 items-center justify-center bg-cover bg-center bg-no-repeat w-screen h-screen">
      <div className="bg-stone-800 rounded-lg p-6">
        <h1 className="text-4xl py-4">
          Chào mừng bạn đến với Hệ Thống Quản Lý Cửa Hàng Cà
          Phê
        </h1>
        <p className="text-lg py-4">
          Quản lý cửa hàng của bạn một cách dễ dàng, nhanh
          chóng!
        </p>
      </div>
      <LogInButton>
        <Button className="m-5 text-3xl hover:bg-cyan-950 p-10">
          Đăng nhập
        </Button>
      </LogInButton>
    </main>
  );
}
