import axios from "axios";
import { cookies } from "next/headers";
import {
  CountryGroup,
  Order,
  ShippingOptionGroup,
  StatusGroup,
} from "../types";

interface OrdersResponse {
  data: Order[];
  shippingOptionGroups: ShippingOptionGroup[];
  statusGroups: StatusGroup[];
  countryGroups: CountryGroup[];
  count: number;
}

export const getOrders = async (query = ""): Promise<OrdersResponse> => {
  const {
    data: { data, count, statusGroups, countryGroups, shippingOptionGroups },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/orders" + query, {
    headers: { Cookie: cookies().toString() },
  });
  return { data, count, statusGroups, countryGroups, shippingOptionGroups };
};
