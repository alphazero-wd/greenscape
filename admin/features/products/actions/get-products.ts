import axios from "axios";
import { Product } from "../types";

interface ProductsResponse {
  count: number;
  data: Product[];
}

export const getProducts = async (query = ""): Promise<ProductsResponse> => {
  const {
    data: { count, data },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products" + query);
  return { count, data };
};
