import { slugify } from "@/features/common/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { Input } from "@/features/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CategoryFormDto } from "../types";

interface CategoryFormProps {
  form: UseFormReturn<CategoryFormDto, any, undefined>;
  loading: boolean;
}

export const CategoryFormFields = ({ form, loading }: CategoryFormProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="py-4">
            <div className="grid grid-cols-4 items-center">
              <FormLabel className="flex-1">Category</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Formal Dresses"
                  {...field}
                  onBlur={() => {
                    field.onBlur();
                    if (!form.getValues("slug"))
                      form.setValue("slug", slugify(field.value));
                  }}
                  className="col-span-3 w-full"
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem className="py-4">
            <div className="grid grid-cols-4 items-center">
              <FormLabel className="flex-1">Slug</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="formal-dresses"
                  {...field}
                  className="col-span-3 w-full"
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
