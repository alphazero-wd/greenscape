import qs from "query-string";
import { Checkbox, Label } from "@/features/ui";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const InStockFilter = () => {
  const searchParams = useSearchParams();
  const [isOutOfStockIncluded, setIsOutOfStockIncluded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const inStock = searchParams.get("inStock");
    if (inStock === "true") setIsOutOfStockIncluded(false);
    else setIsOutOfStockIncluded(true);
  }, [searchParams.get("inStock")]);

  const filterProductsByAvailability = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (isOutOfStockIncluded) delete currentQuery.inStock;
    else currentQuery.inStock = "true";

    currentQuery.offset = "0";
    const urlWithAvailability = qs.stringifyUrl({
      url: "/products",
      query: currentQuery,
    });

    router.push(urlWithAvailability);
  }, 1000);

  useEffect(() => {
    filterProductsByAvailability();
  }, [isOutOfStockIncluded, searchParams.toString()]);

  return (
    <div className="pt-4">
      <Label className="mb-4 block">Availability</Label>
      <div className="flex items-center gap-x-3">
        <Checkbox
          checked={isOutOfStockIncluded}
          onCheckedChange={() => setIsOutOfStockIncluded(!isOutOfStockIncluded)}
        />
        <Label className="font-normal">Include out of stock</Label>
      </div>
    </div>
  );
};
