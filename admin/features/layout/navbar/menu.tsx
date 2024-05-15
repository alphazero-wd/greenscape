"use client";
import { Button } from "@/features/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/features/ui/collapsible";
import { User } from "@/features/user/types";
import { cn } from "@/lib/utils";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./links-data";

export const NavMobileMenu = ({ user }: { user?: User }) => {
  const pathname = usePathname();

  if (!user) return null;

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <Bars3Icon className="h-5 w-5" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="absolute left-0 top-16 z-20 w-full space-y-1 bg-white px-0 pb-4 pt-2 shadow-md lg:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "block border-l-4 border-transparent px-3 py-2 pr-4 text-base font-medium",
              pathname === link.href ||
                (pathname.startsWith(link.href) && link.href !== "/")
                ? "border-primary bg-green-50 text-green-800"
                : "text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700",
            )}
          >
            {link.name}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
