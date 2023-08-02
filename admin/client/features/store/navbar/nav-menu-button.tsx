"use client";
import { Button } from "@/features/ui";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useMobileSidebarNav } from "../hooks";

export const NavMenuButton = () => {
  const { onOpen } = useMobileSidebarNav();
  return (
    <Button size="icon" onClick={onOpen} className="lg:hidden" variant="ghost">
      <Bars3Icon className="h-5 w-5 text-gray-900" />
    </Button>
  );
};
