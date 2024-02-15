"use client";

import {signOut} from "next-auth/react";

interface LogOutButtonProps {
  children?: React.ReactNode;
}

export const LogOutButton = ({children}: LogOutButtonProps) => {
  const onclick = () => {
    signOut();
  };

  return (
    <span onClick={onclick} className="cursor-pointer">
      {children}
    </span>
  );
};
