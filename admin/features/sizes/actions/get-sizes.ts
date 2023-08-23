import axios from "axios";
import { cookies } from "next/headers";
import { Size } from "../types";

export const getSizes = async (query = "") => {
  const {
    data: { count, data },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/sizes" + query, {
    headers: { Cookie: cookies().toString() },
  });
  return { count, data: data as Size[] };
};
