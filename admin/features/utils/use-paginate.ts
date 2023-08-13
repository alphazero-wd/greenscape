import axios from "axios";
import { useState } from "react";

export interface PaginationParams {
  limit: number;
  offset?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  q?: string;
}

export const usePaginate = () => {
  const [loading, setLoading] = useState(false);
  const paginate = async (url: string) => {
    setLoading(true);
    const {
      data: { data, count },
    } = await axios.get(url);
    setLoading(false);
    return { data, count };
  };
  return { paginate, loading };
};
