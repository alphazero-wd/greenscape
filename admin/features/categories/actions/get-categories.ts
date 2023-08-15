import axios from "axios";
import { cookies } from "next/headers";
import { Category } from "../types";

export const getCategories = async (url: string) => {
  const {
    data: { count, data },
  } = await axios.get(url, {
    headers: { Cookie: cookies().toString() },
  });
  return { count, data: data as Category[] };
};
