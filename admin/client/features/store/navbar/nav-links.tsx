"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { NavAssetsMenu } from "./nav-assets-menu";
import { useNavLinks } from "./use-nav-links";

export const NavLinks = () => {
  const links = useNavLinks();
  const { sid } = useParams();
  const pathname = usePathname();

  return (
    <div className="mx-6 hidden items-center space-x-6 lg:flex">
      {links.map((link) => (
        <Link
          key={link.href}
          href={`/store/${sid}${link.href}`}
          className={cn(
            "text-sm font-medium text-gray-500 transition-colors hover:font-semibold hover:text-gray-900",
            `/store/${sid}${link.href}` === pathname &&
              "font-semibold text-gray-900",
          )}
        >
          {link.name}
        </Link>
      ))}
      <NavAssetsMenu />
    </div>
  );
};
