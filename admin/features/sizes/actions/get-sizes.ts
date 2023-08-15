import axios from "axios";
import { cookies } from "next/headers";
import { Size } from "../types";

export const getSizes = async (url: string) => {
  const {
    data: { count, data },
  } = await axios.get(url, {
    headers: { Cookie: cookies().toString() },
  });
  return { count, data: data as Size[] };
};
