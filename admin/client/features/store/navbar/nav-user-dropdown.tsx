"use client";
import { useLogout } from "@/features/auth/hooks";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/ui";
import { User } from "@/features/user/types";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
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
        <DropdownMenuLabel className="font-normal text-gray-500">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dropdownLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block w-full">
              <DropdownMenuItem key={link.text}>
                <link.icon className="mr-2 h-4 w-4 text-gray-500" />
                <span>{link.text}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => await logout()}>
          <LogOut className="mr-2 h-4 w-4 text-gray-500" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
