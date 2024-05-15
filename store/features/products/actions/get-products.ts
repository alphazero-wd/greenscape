import axios from "axios";
import { CategoryGroup, InStockGroup, Product, StatusGroup } from "../types";

interface ProductsResponse {
  count: number;
  data: Product[];
  statusGroups: StatusGroup[];
  inStockGroups: InStockGroup[];
  categoryGroups: CategoryGroup[];
}

export const getProducts = async (query = ""): Promise<ProductsResponse> => {
  const {
    data: { count, data, statusGroups, inStockGroups, categoryGroups },
  } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/products/category" + query
  );
  return {
    count,
    data,
    statusGroups,
    inStockGroups,
    categoryGroups,
  };
};
