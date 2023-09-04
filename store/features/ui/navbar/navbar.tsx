"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { navLinks } from "./utils";
import { Separator } from "../separator";
import { ProfileMenu } from "./profile-menu";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/features/cart/contexts";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { getTotalQty } = useCartStore();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="bg-white w-full container max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between items-center border-b border-gray-300">
        <div className="flex items-center gap-x-8">
          <Logo />
          <div className="items-center h-16 gap-x-8 hidden sm:flex">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                className="font-semibold block h-16 pt-5 text-sm hover:border-b-2 hover:border-green-500 text-gray-900"
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          {/* <div className="lg:flex hidden h-5 space-x-6">
            <Link
              href="/auth/signin"
              className="font-semibold h-[2.625rem] block text-sm hover:border-b-2 hover:border-b-green-500"
            >
              Sign in
            </Link>
            <Separator orientation="vertical" />
            <Link
              href="auth/create-account"
              className="font-semibold h-[2.625rem] block text-sm hover:border-b-2 hover:border-b-green-500"
            >
              Create account
            </Link>
          </div>

          <ProfileMenu /> */}
          <Link href="/cart" className="flex items-center group">
            <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
              {getTotalQty()}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
