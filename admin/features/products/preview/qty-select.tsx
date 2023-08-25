"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/features/ui";
import { useState } from "react";
import { Product } from "../types";

interface QtySelectProps {
  product: Product;
}

export const QtySelect: React.FC<QtySelectProps> = ({ product }) => {
  if (product.inStock === 0)
    return <div className="text-red-600">Out of stock</div>;

  const [qty, setQty] = useState(1);
  return (
    <Select value={qty.toString()} onValueChange={(value) => setQty(+value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select quantity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Quantity</SelectLabel>
          {new Array(product.inStock).fill(null).map((_, i) => (
            <SelectItem key={i} value={(i + 1).toString()}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
