import { Product } from "@/features/products/types";

export interface Order {
  id: string;
  customer: string;
  email: string;
  line1: string;
  line2?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone: string;
  products: (Product & { qty: number })[];
  shippingCost: number;
  amount: number;
  createdAt: Date;
  deliveredAt?: Date;
}

export interface StatusGroup {
  _count: { id: number };
  deliveredAt: null | Date;
}

export interface CountryGroup {
  _count: { id: number };
  country: string;
}
export interface ShippingOptionGroup {
  _count: { id: number };
  shippingCost: number;
}
