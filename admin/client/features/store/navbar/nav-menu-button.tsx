"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/features/ui";
import { useMobileSidebarNav } from "../hooks";

export const NavMenuButton = () => {
  const { onOpen } = useMobileSidebarNav();
  return (
    <Button size="icon" onClick={onOpen} className="lg:hidden" variant="ghost">
      <Bars3Icon className="w-5 h-5 text-gray-900" />
    </Button>
  );
};
