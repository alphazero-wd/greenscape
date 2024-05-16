import axios from "axios";
import { cookies } from "next/headers";
import { Product } from "../types";

interface ProductsResponse {
  count: number;
  data: Product[];
}

export const getProducts = async (
  slug = "",
  query = "",
): Promise<ProductsResponse> => {
  try {
    const {
      data: { count, data },
    } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
        "/products/" +
        (slug ? "category/" + slug : slug) +
        query,
      {
        headers: { Cookie: cookies().toString() },
      },
    );
    return { count, data };
  } catch (error: any) {
    const message = error.response.data.message;
    console.log({ message });
    return { data: [], count: 0 };
  }
};
