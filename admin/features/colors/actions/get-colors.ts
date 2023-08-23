import axios from "axios";
import { cookies } from "next/headers";
import { Color } from "../types";

export const getColors = async (query = "") => {
  const {
    data: { count, data },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL! + "/colors" + query, {
    headers: { Cookie: cookies().toString() },
  });
  return { count, data: data as Color[] };
};
