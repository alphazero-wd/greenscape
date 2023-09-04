import { OrderKeyStats } from "@/features/orders/types";
import axios from "axios";
import { cookies } from "next/headers";

export const getKeyStats = async () => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/stats/key`, {
    headers: { Cookie: cookies().toString() },
  });

  return data as OrderKeyStats;
};
