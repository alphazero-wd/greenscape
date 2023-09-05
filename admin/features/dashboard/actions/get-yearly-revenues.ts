import axios from "axios";
import { cookies } from "next/headers";
import { MonthlyRevenue } from "../types";

export const getMonthlyRevenues = async (year: string) => {
  const {
    data: { data },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/stats/yr-revenues?year=${year}`,
    {
      headers: { Cookie: cookies().toString() },
    },
  );

  return data as {
    startYear: Date;
    endYear: Date;
    monthlyRevenues: MonthlyRevenue[];
  };
};
