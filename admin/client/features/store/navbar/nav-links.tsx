"use client";
import Link from "next/link";
import { useNavLinks } from "../hooks";

export const NavLinks = () => {
  const links = useNavLinks();

  return (
    <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium transition-colors hover:text-gray-900 text-gray-500 hover:font-semibold"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};
