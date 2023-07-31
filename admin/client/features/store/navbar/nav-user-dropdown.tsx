"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
} from "@/features/ui";
import { Settings, LogOut, LayoutDashboard } from "lucide-react";
import { useLogout } from "@/features/auth/hooks";
import { User } from "@/features/user/types/user";
import Link from "next/link";

interface NavUserDropdownProps {
  user?: User;
}

const dropdownLinks = [
  { icon: LayoutDashboard, text: "Dashboard", href: "/" },
  {
    icon: Settings,
    text: "Settings",
    href: "/settings",
  },
];

export const NavUserDropdown: React.FC<NavUserDropdownProps> = ({ user }) => {
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>
            {user?.firstName[0].toUpperCase()}
            {user?.lastName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {user?.firstName} {user?.lastName}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-gray-500 font-normal">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dropdownLinks.map((link) => (
            <Link href={link.href} className="block w-full">
              <DropdownMenuItem key={link.text}>
                <link.icon className="mr-2 text-gray-500 h-4 w-4" />
                <span>{link.text}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => await logout()}>
          <LogOut className="mr-2 text-gray-500 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
