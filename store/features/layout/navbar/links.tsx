"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./links-data";

export const Links = () => {
  const pathname = usePathname();
  return (
    <ul className="hidden h-16 items-center space-x-4 lg:flex lg:space-x-6">
      {navLinks.map((link) => (
        <li key={link.href} className="h-16">
          <Link
            href={link.href}
            className={cn(
              "flex h-16 items-center border-b-2 border-transparent px-1 text-sm font-medium text-muted-foreground",
              pathname === link.href ||
                (pathname.startsWith(link.href) && link.href !== "/")
                ? "border-primary font-semibold text-gray-900"
                : "hover:border-gray-300",
            )}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
