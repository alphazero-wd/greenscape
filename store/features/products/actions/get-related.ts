import axios from "axios";
import { Product } from "../types";

export const getRelatedProducts = async (
  refIds: number[]
): Promise<Product[]> => {
  const {
    data: { data },
  } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
      "/products/recommend?refIds=" +
      refIds.join(",")
  );
  return data as Product[];
};
