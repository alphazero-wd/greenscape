import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/features/ui";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateProductDto } from "../types";

interface ProductOverviewProps {
  form: UseFormReturn<CreateProductDto, any, undefined>;
  loading: boolean;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({
  form,
  loading,
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="py-4">
            <FormLabel className="flex-1">Product name</FormLabel>
            <FormControl>
              <Input
                disabled={loading}
                placeholder="Product name"
                {...field}
                className="col-span-3 w-full"
              />
            </FormControl>
            <FormDescription>
              Keep it short and easy to remember.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="desc"
        render={({ field }) => (
          <FormItem className="py-4">
            <FormLabel className="flex-1">Description</FormLabel>
            <FormControl>
              <Textarea
                disabled={loading}
                placeholder="Add a description here..."
                {...field}
                className="col-span-3 w-full"
              />
            </FormControl>
            <FormDescription>
              Briefly describe the materials, styles, as well as highlight some
              features, how to take care of it.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
