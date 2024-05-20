import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface YearsSelectProps {
  startYear: number;
  endYear: number;
}

export const YearsSelect = ({ startYear, endYear }: YearsSelectProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const searchParams = useSearchParams();
  const router = useRouter();
  const diffBetweenTwoYears = useMemo(
    () => endYear - startYear + 1,
    [startYear, endYear],
  );

  useEffect(() => {
    const shownYear = searchParams.get("year");

    if (shownYear && !isNaN(+shownYear)) {
      const currentYear = +shownYear;
      if (currentYear >= startYear && currentYear <= endYear)
        setYear(currentYear);
      else setYear(new Date().getFullYear());
    }
  }, [startYear, endYear, searchParams.get("year")]);

  const getMonthlyRevenuesInYear = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    currentQuery.year = year.toString();
    const urlWithYear = qs.stringifyUrl({ url: "/", query: currentQuery });
    router.push(urlWithYear, { scroll: false });
  }, 1000);

  useEffect(() => {
    getMonthlyRevenuesInYear();
  }, [year]);

  return (
    <Select value={year.toString()} onValueChange={(value) => setYear(+value)}>
      <SelectTrigger className="w-[100px] font-normal">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        {Array(diffBetweenTwoYears)
          .fill(null)
          .map((_, i) => (
            <SelectItem key={i} value={(i + startYear).toString()}>
              {i + startYear}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
