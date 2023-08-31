import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "../types";
import { toast } from "react-hot-toast";

interface CartStore {
  cart: CartItem[];
  getTotalQty: () => number;
  getTotalPrice: () => number;
  findCartItem: (id: number) => CartItem | undefined;
  addToCart: (cartItem: CartItem) => void;
  updateQty: (id: number, qty: number) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cart: [],
      findCartItem: (id) => get().cart.find((item) => item.id === id),
      getTotalQty: () => get().cart.reduce((sum, item) => (sum += item.qty), 0),
      getTotalPrice: () =>
        get().cart.reduce(
          (totalPrice, item) => (totalPrice += item.qty * item.price),
          0
        ),
      addToCart: (cartItem) => {
        set({ cart: [...get().cart, cartItem] });
        toast.success("Item added to cart");
      },
      updateQty: (id, qty) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, qty } : item
          ),
        });
        toast.success("Quantity updated");
      },
      removeCartItem: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
        toast.success("Item removed from cart");
      },
      clearCart: () => {
        set({ cart: [] });
        toast.success("Cart cleared");
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
