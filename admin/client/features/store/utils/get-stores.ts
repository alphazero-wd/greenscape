import axios from "axios";
import { cookies } from "next/headers";
import { Store } from "../types";

export const getStores = async () => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stores`, {
    headers: { Cookie: cookies().toString() },
  });
  return data as Store[];
};
