import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Switch,
} from "@/features/ui";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateProductDto } from "../types";
import { FormSection } from "./form-section";

interface ProductPreviewProps {
  form: UseFormReturn<CreateProductDto>;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({ form }) => {
  return (
    <FormSection
      heading="Preview"
      description="Have a look at how the product will be displayed before launching"
      isLast
    >
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem className="col-span-full flex flex-row items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>Make the product active once created</FormLabel>
              <FormDescription>
                Show to the world what you are going to sell right away
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value === "Active"}
                onCheckedChange={(checked) => {
                  field.onChange(!checked ? "Draft" : "Active");
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </FormSection>
  );
};
