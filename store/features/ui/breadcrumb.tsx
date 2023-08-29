import { cn } from "@/lib/utils";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

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
            className="flex-shrink-0 text-gray-400 hover:text-gray-500"
          >
            <HomeIcon className="h-5 w-5" />
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
                  "ml-4 line-clamp-1 text-sm font-medium text-gray-400",
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
