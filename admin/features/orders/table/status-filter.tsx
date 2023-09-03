"use client";
import {
  Badge,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/features/ui";
import { cn } from "@/lib/utils";
import { DotFilledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Order, StatusGroup } from "../types";

interface StatusFilterProps {
  table: Table<Order>;
  statusGroups: StatusGroup[];
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  statusGroups,
  table,
}) => {
  const [status, setStatus] = useState<"pending" | "delivered" | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentStatus = searchParams.get("status") as "pending" | "delivered";
    if (!currentStatus) setStatus(null);
    else setStatus(currentStatus);
  }, [searchParams.get("status")]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (status) {
      currentQuery.status = status;
    } else delete currentQuery.status;
    table.resetPageIndex();
    const urlWithStatusQuery = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithStatusQuery);
  }, [status]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Status
          {status && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal capitalize"
              >
                {status}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {(["pending", "delivered"] as const).map((s) => (
                <CommandItem key={s} onSelect={() => setStatus(s)}>
                  <div
                    className={cn(
                      "mr-2 h-4 w-4",
                      status === s
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <DotFilledIcon className="h-4 w-4" />
                  </div>
                  <span className="capitalize">{s}</span>
                  {statusGroups.find(
                    (group) =>
                      (group.deliveredAt === null ? "pending" : "delivered") ===
                      s,
                  )?._count && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {
                        statusGroups.find(
                          (group) =>
                            (group.deliveredAt === null
                              ? "pending"
                              : "delivered") === s,
                        )?._count.id
                      }
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {status && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setStatus(null)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
