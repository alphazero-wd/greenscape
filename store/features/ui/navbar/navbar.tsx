"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { navLinks } from "./utils";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../separator";
import { ProfileMenu } from "./profile-menu";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-7xl container border-b border-gray-300">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center gap-x-8">
            <Logo />
            <div className="items-center h-16 gap-x-8 hidden lg:flex">
              {navLinks.map((link) => (
                <Link
                  href={link.href}
                  className="font-semibold block shadow-sm h-16 pt-5 text-sm hover:border-b-2 hover:border-green-500 text-gray-900"
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-8">
            <div className="lg:flex hidden h-5 space-x-6">
              <Link href="/auth/signin" className="font-semibold h-[2.625rem] block text-sm hover:border-b-2 hover:border-b-green-500">Sign in</Link>
              <Separator orientation="vertical" />
              <Link href="auth/create-account" className="font-semibold h-[2.625rem] block text-sm hover:border-b-2 hover:border-b-green-500">
                Create account
              </Link>
            </div>

            <ProfileMenu />
            <Link href="/cart" className="text-gray-500 hover:text-gray-700">
              <ShoppingBagIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
