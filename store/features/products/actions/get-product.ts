import axios from "axios";
import { Product } from "../types";

export const getProduct = async (id: string) => {
  const {
    data: { data },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products/" + id);
  return { data: data as Product };
};
