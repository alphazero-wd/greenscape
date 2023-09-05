"use client";
import { useLogout } from "@/features/auth/logout";
import { User } from "@/features/user/types";
import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";

export const Profile = ({ user }: { user?: User }) => {
  const { logout } = useLogout();

  if (!user) return null;

  return (
    <>
    <div className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
        <AvatarFallback>
          {user?.firstName[0].toUpperCase()}
          {user?.lastName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-xs leading-none text-gray-500">{user?.email}</p>
      </div></div>

      <Button variant="ghost" onClick={logout} className="hidden lg:flex">
        <LogOutIcon className="h-5 w-5 text-gray-500 sm:mr-2" />{" "}
        <span>Log out</span>
      </Button>
    </>
  );
};
