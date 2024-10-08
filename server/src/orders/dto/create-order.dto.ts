export interface CreateOrderDto {
  id: string;
  customer: string;
  email: string;
  phone: string;
  total: number;
  shippingCost: number;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  tax: number;
  postalCode?: string;
  country?: string;
  bag: {
    productId: number;
    qty: number;
  }[];
}
