import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  links: {
    name: string;
    href: string;
  }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <Link
            href="/"
            className="text-gray-400 flex-shrink-0 hover:text-gray-500"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {links.map((link, index) => (
          <li key={link.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <Link
                href={link.href}
                className={cn(
                  "text-gray-400 ml-4 line-clamp-1 font-medium text-sm",
                  index === links.length - 1
                    ? "text-gray-900"
                    : "hover:text-gray-500"
                )}
              >
                {link.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
