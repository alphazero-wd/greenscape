import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/ui/card";
import { Input } from "@/features/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "../../ui/form";
import { ProductFormDto } from "../types";

interface SlugInputProps {
  form: UseFormReturn<ProductFormDto, any, undefined>;
  loading: boolean;
}

export const SlugInput = ({ form, loading }: SlugInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Slug</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <Input
                {...field}
                value={field.value}
                disabled={loading}
                placeholder="white-tshirts"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
