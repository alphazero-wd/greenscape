import { cn } from "@/lib/utils";

interface SizeSelectProps {
  isSelected?: boolean;
  inStock?: number;
  label: string;
}

export const SizeSelect: React.FC<SizeSelectProps> = ({
  isSelected,
  inStock = 1,
  label,
}) => {
  return (
    <label
      className={cn(
        "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
        isSelected &&
          (inStock ? "ring-2 ring-gray-900" : "ring-2 ring-gray-500"),
        inStock
          ? "cursor-pointer bg-white text-gray-900 shadow-sm "
          : "bg-gray-50 text-gray-200",
      )}
    >
      {label}
    </label>
  );
};
