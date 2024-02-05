"use client";

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/ui";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";
import { differenceInCalendarDays, format, isValid } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useDebouncedCallback } from "use-debounce";
import { Order } from "../types";

interface DateRangeFilterProps {
  table: Table<Order>;
}

export function DateRangeFilter({ table }: DateRangeFilterProps) {
  const searchParams = useSearchParams();
  const [date, setDate] = useState<DateRange | undefined>();
  const router = useRouter();

  useEffect(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    if (
      startDate &&
      endDate &&
      isValid(new Date(startDate)) &&
      isValid(new Date(endDate)) &&
      differenceInCalendarDays(new Date(endDate), new Date(startDate)) > 0
    )
      setDate({
        from: new Date(startDate),
        to: new Date(endDate),
      });
    else setDate(undefined);
  }, [searchParams.get("startDate"), searchParams.get("endDate")]);

  const filterOrdersWithinDateRange = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (date?.from && date.to) {
      currentQuery.startDate = date.from.toISOString();
      currentQuery.endDate = date.to.toISOString();
    } else {
      delete currentQuery.startDate;
      delete currentQuery.endDate;
    }
    table.resetPageIndex();
    const urlWithDateRange = qs.stringifyUrl({ url: "", query: currentQuery });
    router.push(urlWithDateRange, { scroll: false });
  }, 500);

  useEffect(() => {
    filterOrdersWithinDateRange();
  }, [date]);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <CalendarIcon className="mr-2 h-4 w-4" />

            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} -{" "}
                  {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
