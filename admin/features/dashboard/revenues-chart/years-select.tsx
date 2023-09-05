import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/ui";
import { addYears, isValid } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useMemo, useState } from "react";

interface YearsSelectProps {
  startYear: Date;
  endYear: Date;
}

export const YearsSelect = ({ startYear, endYear }: YearsSelectProps) => {
  const [year, setYear] = useState(new Date());
  const searchParams = useSearchParams();
  const router = useRouter();
  const diffBetweenTwoYears = useMemo(
    () =>
      new Date(endYear).getFullYear() - new Date(startYear).getFullYear() + 1,
    [startYear, endYear],
  );

  useEffect(() => {
    const shownYear = searchParams.get("year");
    const startFullYear = new Date(startYear).getFullYear();
    const endFullYear = new Date(endYear).getFullYear();

    if (shownYear && isValid(new Date(shownYear))) {
      const shownFullYear = new Date(shownYear).getFullYear();
      if (shownFullYear >= startFullYear && shownFullYear <= endFullYear)
        setYear(new Date(shownYear));
      else setYear(new Date());
    } else setYear(new Date());
  }, [searchParams.get("year")]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    currentQuery.year = year.toISOString();
    const urlWithYear = qs.stringifyUrl({ url: "/", query: currentQuery });
    router.push(urlWithYear);
  }, [year]);

  return (
    <Select
      defaultValue={String(diffBetweenTwoYears - 1)}
      onValueChange={(value) => setYear(addYears(new Date(startYear), +value))}
    >
      <SelectTrigger className="w-[100px] font-normal">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        {Array(diffBetweenTwoYears)
          .fill(null)
          .map((_, i) => (
            <SelectItem key={i} value={i.toString()}>
              {i + new Date(startYear).getFullYear()}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
