import React from "react";
import Image from "next/image";
import { CartItem as ICartItem } from "../types";
import { formatPrice } from "@/features/products/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/features/ui";
import { useCartStore } from "../contexts";

interface CartItemProps {
  item: ICartItem;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQty, removeCartItem } = useCartStore();

  return (
    <li className="flex items-center py-6">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.imageId}`}
        alt={item.name}
        width={128}
        height={128}
        className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 aspect-square object-cover"
      />
      <div className="ml-4 sm:ml-6 flex-1 flex flex-col justify-between">
        <div className="sm:grid sm:grid-cols-2 sm:gap-x-6 items-start pr-9 sm:pr-0 relative">
          <div>
            <h4 className="text-gray-900 line-clamp-2 font-medium text-sm">
              {item.name}
            </h4>
            <p className="text-gray-500 mt-1 text-sm">{item.category.name}</p>
            <p className="text-gray-900 mt-1 font-medium text-sm">
              {formatPrice(item.price)}
            </p>
          </div>
          <div className="flex sm:pr-9 sm:mt-0 mt-4 items-end justify-between">
            <label htmlFor="qty" className="sr-only">
              Quantity of {item.name}
            </label>
            <select
              value={item.qty}
              onChange={(e) => updateQty(item.id, +e.target.value)}
              className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
              id="qty"
            >
              {Array(item.inStock)
                .fill(null)
                .map((_, i) => (
                  <option key={i} value={`${i + 1}`}>
                    {i + 1}
                  </option>
                ))}
            </select>
          </div>
          <div className="absolute top-0 right-0">
            <span className="sr-only">Remove item from cart</span>
            <Button
              onClick={() => removeCartItem(item.id)}
              variant="ghost"
              className="group hover:bg-transparent"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};
