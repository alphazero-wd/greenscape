import { format } from "date-fns";
import { Billboard } from "../types";

export const groupBillboardsByDates = (billboards: Billboard[]) => {
  const dates = Array.from(
    new Set(billboards.map((billboard) => format(billboard.createdAt, "PP"))),
  );

  return dates.map((date) => ({
    date,
    billboards: billboards.filter(
      (billboard) => format(billboard.createdAt, "PP") === date,
    ),
  }));
};
