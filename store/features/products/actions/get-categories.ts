import axios from "axios";
import { Category } from "../types";

export const getCategories = async (query = "") => {
  const {
    data: { count, data },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/categories" + query);
  return { count, data: data as Category[] };
};
