import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMeQuery = () => {
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        withCredentials: true,
      }),
  });

  return meQuery;
};
