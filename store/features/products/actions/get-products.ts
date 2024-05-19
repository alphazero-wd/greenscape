import axios from "axios";
import { Product } from "../types";

export const getProducts = async (
  query = "",
  categorySlug = ""
): Promise<Product[]> => {
  const {
    data: { data },
  } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
      "/products/store" +
      (categorySlug ? "/category/" + categorySlug : "") +
      query
  );
  return data;
};
