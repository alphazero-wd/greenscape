import axios from "axios";
import { cookies } from "next/headers";
import { Category } from "../types";

export const getCategories = async (query = "") => {
  const {
    data: { count, data },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/categories" + query, {
    headers: { Cookie: cookies().toString() },
  });
  return { count, data: data as Category[] };
};
