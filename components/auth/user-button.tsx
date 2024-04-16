import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {useCurrentUser} from "@/hooks/use-current-user";
import {LogOutButton} from "@/components/auth/logout-button";
import {ExitIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {ChevronDown, User} from "lucide-react";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <div className="flex flex-row gap-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 p-1">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
          <p>{user?.name}</p>
          <div className="rounded-full p-1 bg-gray-100">
            <ChevronDown className="opacity-75" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuItem>
            <Link href={"/profile"} className="flex">
              <User className="h-4 w-4 mr-2" />
              Trang cá nhân
            </Link>
          </DropdownMenuItem>
          <LogOutButton>
            <DropdownMenuItem>
              <ExitIcon className="h-4 w-4 mr-2 " />
              Đăng xuất
            </DropdownMenuItem>
          </LogOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
