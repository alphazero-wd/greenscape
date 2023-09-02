export interface CreateOrderDto {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  shippingOption: string;
  cart: {
    productId: number;
    qty: number;
  }[];
}
