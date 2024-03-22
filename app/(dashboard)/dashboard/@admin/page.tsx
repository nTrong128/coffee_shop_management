"use client";
import {Button} from "@/components/ui/button";
import {useCurrentUser} from "@/hooks/use-current-user";
import {signOut} from "next-auth/react";

const Home = () => {
  const user = useCurrentUser();

  return (
    <main className="text-center flex  flex-col items-center justify-center bg-cover bg-center bg-no-repeat h-screen">
      <h1 className="text-4xl py-4">
        Chào mừng bạn đến với Hệ Thống Quản Lý Cửa Hàng Cà Phê
      </h1>
      <p className="text-lg py-4">
        Quản lý cửa hàng của bạn một cách dễ dàng, nhanh chóng!
      </p>
      <p className="text-lg py-4">{JSON.stringify(user)}</p>
      <h1 className="text-9xl py-4">DASHBOARD ADMIN PAGE</h1>
    </main>
  );
};

export default Home;
