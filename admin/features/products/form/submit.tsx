import { Button } from "@/features/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProductFormSubmitProps {
  className?: string;
  loading: boolean;
}
export const ProductFormSubmit = ({
  className,
  loading,
}: ProductFormSubmitProps) => {
  const router = useRouter();
  const onDiscard = () => {
    if (confirm("Are you sure you want to discard the product?"))
      router.push("/products");
  };
  return (
    <div className={cn("items-center gap-2", className)}>
      <Button
        disabled={loading}
        type="button"
        onClick={onDiscard}
        variant="outline"
        size="sm"
      >
        Discard
      </Button>
      <Button disabled={loading} size="sm" type="submit">
        Save Product
      </Button>
    </div>
  );
};
