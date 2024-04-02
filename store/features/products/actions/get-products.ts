import axios from "axios";
import { CategoryGroup, InStockGroup, Product, StatusGroup } from "../types";

interface ProductsResponse {
  count: number;
  data: Product[];
  inStockGroups: InStockGroup[];
  categoryGroups: CategoryGroup[];
}

export const getProducts = async (query = ""): Promise<ProductsResponse> => {
  const {
    data: { count, data, inStockGroups, categoryGroups },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products" + query);
  return {
    count,
    data,
    inStockGroups,
    categoryGroups,
  };
};
