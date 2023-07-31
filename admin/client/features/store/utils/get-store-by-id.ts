import axios from "axios";
import { Store } from "../types/store";
import { cookies } from "next/headers";

export const getStoreById = async (id: string) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stores/${id}`, {
      headers: { Cookie: cookies().toString() },
    });
    return data as Store | undefined;
  } catch (error) {
    console.log({ error });
  }
};
