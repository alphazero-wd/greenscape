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
import { PriceInput } from "../components";
import { ProductFormDto } from "../types";
import { FormSection } from "./form-section";

interface ProductOverviewProps {
  form: UseFormReturn<ProductFormDto, any, undefined>;
  loading: boolean;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({
  form,
  loading,
}) => {
  return (
    <FormSection
      heading="Overview"
      description="Provide some basic information about the product"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="sm:col-span-4">
            <FormLabel className="block">Product name</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder="Product name" {...field} />
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
          <FormItem className="col-span-full">
            <FormLabel className="block">Description</FormLabel>
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

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem className="sm:col-span-3">
            <FormLabel className="block">Pricing</FormLabel>
            <FormControl>
              <PriceInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="inStock"
        render={({ field }) => (
          <FormItem className="sm:col-span-3">
            <FormLabel className="block">In stock</FormLabel>
            <FormControl>
              <Input type="number" placeholder="4" min={0} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
};
