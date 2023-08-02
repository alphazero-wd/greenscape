import axios from "axios";
import { cookies } from "next/headers";
import { Store } from "../types/store";

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
