import { Size } from "@/features/sizes/types";
import axios from "axios";
import { Product } from "../types";

interface ProductsResponse {
  sizes: Size[];
  count: number;
  data: Product[];
}

export const getProducts = async (query = ""): Promise<ProductsResponse> => {
  const {
    data: { sizes, count, data },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products" + query);
  return { sizes, count, data };
};
