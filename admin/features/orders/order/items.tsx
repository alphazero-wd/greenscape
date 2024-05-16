"use client";
import { formatPrice } from "@/features/common/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/ui/table";
import { useRouter } from "next/navigation";
import { Order } from "../types";
import { getShippingOption } from "../utils";

export const OrderItems = ({ order }: { order: Order }) => {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Unit price</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.products.map(({ productId, qty, product }) => (
          <TableRow
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/products/${productId}/preview`)}
            key={productId}
          >
            <TableCell>{product.category.name}</TableCell>
            <TableCell className="text-right">{qty}</TableCell>
            <TableCell className="text-right">
              {formatPrice(product.price)}
            </TableCell>
            <TableCell className="text-right">
              {formatPrice(product.price * qty)}
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="text-right" colSpan={4}>
            <ul>
              <li className="text-sm text-gray-500">
                Shipping ({getShippingOption(+order.shippingCost)})
              </li>
              <li className="font-medium text-gray-900">Total</li>
            </ul>
          </TableCell>
          <TableCell>
            <ul className="text-right">
              <li className="text-sm text-gray-500">
                {formatPrice(order.shippingCost)}
              </li>
              <li className="font-medium text-gray-900">
                {formatPrice(order.total)}
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
