import axios from "axios";
import { cookies } from "next/headers";
import { Product } from "../types";

interface ProductsResponse {
  count: number;
  data: Product[];
}

export const getProducts = async (query = ""): Promise<ProductsResponse> => {
  const {
    data: { count, data },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products" + query, {
    headers: { Cookie: cookies().toString() },
  });
  return { count, data };
};
