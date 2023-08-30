"use client";
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Slider,
} from "@/features/ui";
import { useState } from "react";
import { Product } from "../types";

interface QtySelectProps {
  product: Product;
}

export const QtySelect: React.FC<QtySelectProps> = ({ product }) => {
  const [qty, setQty] = useState(1);

  if (product.inStock === 0)
    return <div className="text-red-600">Out of stock</div>;

  return (
    <div className="mt-6 w-1/2">
      <Label className="block mb-4">
        {qty ? "Quantity: " + qty : "Select quantity"}
      </Label>
      <Slider
        min={1}
        value={[qty]}
        max={product.inStock}
        onValueChange={(val) => setQty(val[0])}
      />
    </div>
  );
};
