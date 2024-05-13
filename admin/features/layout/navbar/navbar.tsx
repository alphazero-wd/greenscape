import { DesktopLogo, MobileLogo } from "@/features/common/components/logo";
import { getCurrentUser } from "@/features/user/utils";
import Link from "next/link";
import { Links } from "./links";
import { NavMobileMenu } from "./menu";
import { Profile } from "./profile";

export async function Navbar() {
  const user = await getCurrentUser();
  return (
    <nav className="relative w-full border-b px-4">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-x-6">
          <Link href="/" className="-ml-2">
            <div className="lg:hidden">
              <MobileLogo />
            </div>
            <div className="hidden lg:block">
              <DesktopLogo />
            </div>
          </Link>
          <Links />
        </div>
        <div className="flex h-full items-center gap-x-6">
          <Profile user={user} />
          <NavMobileMenu user={user} />
        </div>
      </div>
    </nav>
  );
}
