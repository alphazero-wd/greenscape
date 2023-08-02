"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/features/ui";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { useNavAssetLinks } from "../hooks";

export function NavAssetsMenu() {
  const assets = useNavAssetLinks();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Assets</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {assets.map(({ title, href, description }) => (
                <ListItem key={title} title={title} href={href}>
                  {description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, href, ...props }, ref) => {
  const { sid } = useParams();
  const pathname = usePathname();
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={`/store/${sid}/${href}`}
          ref={ref}
          className={cn(
            "block space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-gray-100",
            `/store/${sid}/${href}` === pathname && "bg-gray-100",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
