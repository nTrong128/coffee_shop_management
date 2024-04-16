"use client";
import Staff from "@/components/content/staff-dashboard";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import {NavBar} from "@/components/dashboard/navbar";

const Home = () => {
  return (
    <main>
      <p className="text-lg text-slate-950 py-4">hello</p>
      <Staff />
    </main>
  );
};

export default Home;
