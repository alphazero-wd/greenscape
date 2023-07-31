"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/features/ui";
import { useMobileNav } from "../hooks";

export const NavMenuButton = () => {
  const { onToggle } = useMobileNav();
  return (
    <Button
      size="icon"
      onClick={onToggle}
      className="lg:hidden"
      variant="ghost"
    >
      <Bars3Icon className="w-5 h-5 text-gray-900" />
    </Button>
  );
};
