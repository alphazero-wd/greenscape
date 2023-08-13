import axios from "axios";
import qs from "query-string";
import { useState } from "react";

export interface PaginationParams {
  limit: number;
  offset?: number;
  q?: string;
}

export const usePaginate = (entityName: "categories" | "plants") => {
  const [loading, setLoading] = useState(false);
  const paginate = async ({ limit = 10, offset, q }: PaginationParams) => {
    setLoading(true);
    const url = qs.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_API_URL}/${entityName}`,
      query: {
        limit,
        offset,
        q,
      },
    });
    const {
      data: { data, count },
    } = await axios.get(url);
    setLoading(false);
    return { data, count };
  };
  return { paginate, loading };
};
