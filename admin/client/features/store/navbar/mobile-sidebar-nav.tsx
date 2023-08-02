"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Sheet,
  SheetContent,
} from "@/features/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMobileSidebarNav, useNavAssetLinks, useNavLinks } from "../hooks";

export const MobileSidebarNav = () => {
  const { isOpen, onClose } = useMobileSidebarNav();
  const navLinks = useNavLinks();
  const navAssetLinks = useNavAssetLinks();
  const pathname = usePathname();
  const { sid } = useParams();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white p-2 lg:hidden">
        <br />
        <div className="mt-8 space-y-4">
          {navLinks.map((link) => (
            <Link
              className={cn(
                "block w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100",
                `/store/${sid}${link.href}` === pathname && "font-medium",
              )}
              href={`/store/${sid}${link.href}`}
              onClick={onClose}
            >
              {link.name}
            </Link>
          ))}
          <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value="nav-assets">
              <AccordionTrigger className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100">
                Assets
              </AccordionTrigger>
              <AccordionContent className="ml-4 space-y-2">
                {navAssetLinks.map((link) => (
                  <Link
                    className={cn(
                      "block w-full rounded-md px-3 py-2 text-sm hover:bg-gray-900 hover:text-white",
                      `/store/${sid}${link.href}` === pathname &&
                        "bg-gray-900 text-white",
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
