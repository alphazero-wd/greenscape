"use client";
import Link from "next/link";
import { useNavLinks } from "../hooks";
import { NavAssetsMenu } from "./nav-assets-menu";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavLinks = () => {
  const links = useNavLinks();
  const { sid } = useParams();
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center space-x-6 mx-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={`/store/${sid}${link.href}`}
          className={cn(
            "text-sm font-medium transition-colors hover:text-gray-900 text-gray-500 hover:font-semibold",
            `/store/${sid}${link.href}` === pathname &&
              "text-gray-900 font-semibold"
          )}
        >
          {link.name}
        </Link>
      ))}
      <NavAssetsMenu />
    </div>
  );
};
