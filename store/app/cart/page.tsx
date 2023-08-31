import { CartList, CartSummary, Related } from "@/features/cart/client";

export const metadata = {
  title: "Shopping Cart",
};

export default function CartPage() {
  return (
    <div className="pb-24 container max-w-2xl lg:max-w-7xl pt-16 px-4 sm:px-6 lg:px-8">
      <h1 className="font-bold tracking-tight sm:text-4xl text-3xl">
        Shopping Cart
      </h1>

      <div className="lg:grid relative lg:grid-cols-12 lg:items-start lg:gap-x-12">
        <CartList />
        <CartSummary />
      </div>
      <Related />
    </div>
  );
}
