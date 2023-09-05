"use client";
import { cn } from "@/lib/utils";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import { navLinks } from "./links-data";

export const MobileNavMenu = () => {
  const pathname = usePathname();

  return (
    <Collapsible>
      <CollapsibleTrigger>
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
              pathname === link.href
                ? "border-green-500 bg-green-50 text-green-800"
                : "text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            )}
          >
            {link.name}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
