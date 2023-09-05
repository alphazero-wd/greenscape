import { getCurrentUser } from "@/features/user/utils";
import Link from "next/link";
import { DesktopLogo, MobileLogo } from "../logo";
import { Links } from "./links";
import { MobileNavMenu } from "./mobile-nav-menu";
import { Profile } from "./profile";

export default async function Navbar() {
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
          <MobileNavMenu user={user} />
        </div>
      </div>
    </nav>
  );
}
