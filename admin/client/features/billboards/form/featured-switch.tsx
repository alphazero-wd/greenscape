"use client";
import { Label, Switch } from "@/features/ui";

interface FeaturedSwitchProps {
  isFeatured: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const FeaturedSwitch: React.FC<FeaturedSwitchProps> = ({
  isFeatured,
  onCheckedChange,
}) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <Label htmlFor="isFeatured">Featured</Label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Decide whether the billboard will be put on display on the store
        </p>
      </div>
      <Switch checked={isFeatured} onCheckedChange={onCheckedChange} />
    </div>
  );
};
