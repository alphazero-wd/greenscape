"use client";
import { formatPrice } from "@/features/common/utils";
import { getCountryName } from "@/features/orders/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/card";
import { useMemo } from "react";
import { SaleByCountry } from "../types";
import { getSalesPieChartCss } from "../utils";

const colors = [
  "#22c55e",
  "#ef4444",
  "#14b8a6",
  "#f97316",
  "#10b981",
  "#a855f7",
  "#f43f5e",
];
export const SalesByCountries = ({ data }: { data: SaleByCountry[] }) => {
  const formattedData = useMemo(
    () =>
      data.map((group, index) => ({
        name: getCountryName(group.country),
        value: group._sum,
        color: colors[index],
      })),
    [data],
  );

  const cssString = useMemo(
    () => getSalesPieChartCss(formattedData),
    [formattedData],
  );

  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle className="text-base">Sales by Countries</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full rounded-full"
        >
          <clipPath id="hole">
            <path d="M 50 0 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100 v 18 a 2 2 0 0 0 0 64 2 2 0 0 0 0 -64" />
          </clipPath>
          <foreignObject
            x="0"
            y="0"
            width="100"
            height="100"
            clipPath="url(#hole)"
          >
            <div
              className="h-full w-full"
              style={{
                background: `conic-gradient(${cssString})`,
              }}
            />
          </foreignObject>
        </svg>

        <ul className="mt-4 space-y-4">
          {formattedData.map((sale) => (
            <li key={sale.name} className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <div
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: sale.color }}
                />
                <span className="text-sm font-medium">{sale.name}</span>
              </div>

              <span className="text-sm text-gray-500">
                {formatPrice(sale.value)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
