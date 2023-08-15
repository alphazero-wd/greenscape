import axios from "axios";
import { cookies } from "next/headers";
import { Color } from "../types";

export const getColors = async (url: string) => {
  const {
    data: { count, data },
  } = await axios.get(url, {
    headers: { Cookie: cookies().toString() },
  });
  return { count, data: data as Color[] };
};
