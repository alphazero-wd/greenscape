import axios from "axios";
import { Product } from "../types";

export const getProduct = async (slug: string) => {
  const {
    data: { data },
  } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/products/details/" + slug
  );
  return { data: data as Product };
};
