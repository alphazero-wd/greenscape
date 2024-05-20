"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useBagStore } from "@/features/bag/contexts";
import { useEffect, useState } from "react";

export const BagLink = () => {
  const [mounted, setMounted] = useState(false);
  const getTotalQty = useBagStore((state) => state.getTotalQty);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Link href="/bag" className="flex items-center group">
      <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-muted-foreground group-hover:text-secondary-foreground" />
      <span className="ml-2 text-sm font-medium text-secondary-foreground group-hover:text-foreground">
        {getTotalQty()}
      </span>
    </Link>
  );
};
