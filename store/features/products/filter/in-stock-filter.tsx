import { Checkbox } from "@/features/ui/checkbox";
import { Label } from "@/features/ui/label";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQueryStore } from "@/features/products/hooks";

export const InStockFilter = () => {
  const searchParams = useSearchParams();
  const outOfStockIncluded = useQueryStore((state) => state.outOfStockIncluded);
  const update = useQueryStore((state) => state.update);

  useEffect(() => {
    const inStock = searchParams.get("inStock");
    if (inStock === "true") update({ outOfStockIncluded: false });
    else update({ outOfStockIncluded: true });
  }, [searchParams.get("inStock")]);

  return (
    <div className="pt-4">
      <Label className="mb-4 block">Availability</Label>
      <div className="flex items-center gap-x-3">
        <Checkbox
          checked={!outOfStockIncluded}
          onCheckedChange={() =>
            update({ outOfStockIncluded: !outOfStockIncluded })
          }
        />
        <Label className="font-normal">Don&apos;t include out of stock</Label>
      </div>
    </div>
  );
};
