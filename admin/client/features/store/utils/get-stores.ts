import axios from "axios";
import { Store } from "../types/store";
import { cookies } from "next/headers";

export const getStores = async () => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stores`, {
    headers: { Cookie: cookies().toString() },
  });
  return data as Store[];
};
