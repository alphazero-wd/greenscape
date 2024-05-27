"use client";
import { useLogout } from "@/features/auth/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/features/ui/avatar";
import { Button } from "@/features/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import { User } from "@/features/user/types";

export const Profile = ({ user }: { user?: User }) => {
  const { logout } = useLogout();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {user.firstName[0].toUpperCase()}
              {user.lastName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user.firstName} {user.lastName}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal text-muted-foreground">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
