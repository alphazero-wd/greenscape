"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
} from "@/features/ui";
import { useMobileSidebarNav, useNavAssetLinks, useNavLinks } from "../hooks";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const MobileSidebarNav = () => {
  const { isOpen, onClose } = useMobileSidebarNav();
  const navLinks = useNavLinks();
  const navAssetLinks = useNavAssetLinks();
  const pathname = usePathname();
  const { sid } = useParams();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white lg:hidden p-2">
        <br />
        <div className="mt-8 space-y-4">
          {navLinks.map((link) => (
            <Link
              className={cn(
                "rounded-md block w-full px-3 py-2 text-sm hover:bg-gray-100 font-medium",
                `/store/${sid}${link.href}` === pathname && "font-medium"
              )}
              href={`/store/${sid}${link.href}`}
              onClick={onClose}
            >
              {link.name}
            </Link>
          ))}
          <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value="nav-assets">
              <AccordionTrigger className="py-2 px-3 text-sm rounded-md hover:bg-gray-100 font-medium">
                Assets
              </AccordionTrigger>
              <AccordionContent className="space-y-2 ml-4">
                {navAssetLinks.map((link) => (
                  <Link
                    className={cn(
                      "rounded-md block w-full px-3 py-2 text-sm hover:text-white hover:bg-gray-900",
                      `/store/${sid}${link.href}` === pathname &&
                        "text-white bg-gray-900"
                    )}
                    href={link.href}
                    onClick={onClose}
                  >
                    {link.title}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};
