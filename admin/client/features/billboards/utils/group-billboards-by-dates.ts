import { format } from "date-fns";
import { Billboard } from "../types";

export const groupBillboardsByDates = (billboards: Billboard[]) => {
  const dates = Array.from(
    new Set(
      billboards.map((billboard) =>
        format(new Date(billboard.createdAt), "PP"),
      ),
    ),
  );

  return dates.map((date) => ({
    date,
    billboards: billboards.filter(
      (billboard) => format(new Date(billboard.createdAt), "PP") === date,
    ),
  }));
};
