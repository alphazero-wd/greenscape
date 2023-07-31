"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Collapsible,
  CollapsibleContent,
} from "@/features/ui";
import { useMobileNav, useNavAssetLinks, useNavLinks } from "../hooks";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const MobileNavLinks = () => {
  const { isOpen } = useMobileNav();
  const navLinks = useNavLinks();
  const navAssetLinks = useNavAssetLinks();
  const pathname = usePathname();
  const { sid } = useParams();

  return (
    <Collapsible open={isOpen} className="lg:hidden">
      <CollapsibleContent className="bg-white p-2 space-y-1">
        {navLinks.map((link) => (
          <Link
            className={cn(
              "rounded-md block w-full px-3 py-2 text-sm hover:text-white hover:bg-gray-900",
              `/store/${sid}${link.href}` === pathname &&
                "text-white bg-gray-900"
            )}
            href={`/store/${sid}${link.href}`}
          >
            {link.name}
          </Link>
        ))}
        <Accordion className="w-full px-1" collapsible>
          <AccordionItem value="nav-assets">
            <AccordionTrigger className="p-2 text-sm rounded-md hover:bg-gray-100">
              Assets
            </AccordionTrigger>
            <AccordionContent className="space-y-1">
              {navAssetLinks.map((link) => (
                <Link
                  className={cn(
                    "rounded-md block w-full px-3 py-2 text-sm hover:text-white hover:bg-gray-900",
                    `/store/${sid}${link.href}` === pathname &&
                      "text-white bg-gray-900"
                  )}
                  href={link.href}
                >
                  {link.title}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CollapsibleContent>
    </Collapsible>
  );
};
