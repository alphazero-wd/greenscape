import { Size } from "@/features/sizes/types";
import axios from "axios";
import { Product } from "../types";

interface ProductsResponse {
  sizes: Size[];
  count: number;
  data: Product[];
}

export const getProducts = async (url: string): Promise<ProductsResponse> => {
  const {
    data: { sizes, count, data },
  } = await axios.get(url);
  return { sizes, count, data };
};
