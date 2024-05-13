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
    const shownYear = +(searchParams.get("year") || new Date().getFullYear());
    if (shownYear) {
      if (shownYear >= startYear && shownYear <= endYear) setYear(shownYear);
      else setYear(new Date().getFullYear());
    } else setYear(new Date().getFullYear());
  }, [searchParams.get("year")]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    currentQuery.year = year.toString();
    const urlWithYear = qs.stringifyUrl({ url: "/", query: currentQuery });
    router.push(urlWithYear, { scroll: false });
  }, [year]);

  return (
    <Select
      defaultValue={String(diffBetweenTwoYears - 1)}
      onValueChange={(value) => setYear(+value)}
    >
      <SelectTrigger className="w-[100px] font-normal">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        {Array(diffBetweenTwoYears)
          .fill(null)
          .map((_, i) => (
            <SelectItem key={i} value={i.toString()}>
              {i + startYear}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
