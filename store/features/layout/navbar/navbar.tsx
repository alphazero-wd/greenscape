import { getCategoriesTree } from "@/features/categories/actions";
import { DesktopLogo, MobileLogo } from "@/features/common/components/logo";
import Link from "next/link";
import { DesktopLinks } from "./desktop-links";
import { MobileLinks } from "./mobile-links";
import { SearchInput } from "@/features/common/components";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export async function Navbar() {
  const categories = await getCategoriesTree();

  return (
    <nav className="relative w-full border-b px-4 sm:px-6 lg:px-8">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="-ml-4">
            <MobileLinks categories={categories} />
            <DesktopLinks categories={categories} />
          </div>
          <Link href="/" className="lg:hidden">
            <MobileLogo />
          </Link>
        </div>
        <Link href="/" className="hidden lg:block">
          <DesktopLogo />
        </Link>
        <div className="flex h-full items-center gap-x-6">
          <SearchInput />
          <Link href="/cart" className="flex items-center group">
            <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-muted-foreground group-hover:text-secondary-foreground" />
            <span className="ml-2 text-sm font-medium text-secondary-foreground group-hover:text-foreground">
              1
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
