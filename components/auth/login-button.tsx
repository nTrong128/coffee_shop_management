"use client";
import {useRouter} from "next/navigation";
interface LogInButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LogInButton = ({children, mode = "redirect", asChild}: LogInButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/login");
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
