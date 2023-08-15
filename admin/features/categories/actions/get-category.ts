import axios from "axios";
import { cookies } from "next/headers";
import { Category } from "../types";

export const getCategory = async (id: string) => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
    headers: { Cookie: cookies().toString() },
  });
  return { data: data as Category };
};
