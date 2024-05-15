import { Button } from "@/features/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ProductFormSubmit } from "./submit";

interface ProductFormHeaderProps {
  heading: string;
  loading: boolean;
}

export const ProductFormHeader = ({
  heading,
  loading,
}: ProductFormHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          asChild
          variant="outline"
          size="icon"
          className="h-7 w-7"
        >
          <Link href="/products/category">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {heading}
        </h1>
      </div>
      <ProductFormSubmit loading={loading} className="hidden md:flex" />
    </div>
  );
};
