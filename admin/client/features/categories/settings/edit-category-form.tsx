"use client";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/features/ui";
import { Loader2 } from "lucide-react";
import { Category } from "../types";
import { useEditCategory } from "./use-edit-category";

interface SettingsClientProps {
  category: Category;
}

export const EditCategoryForm: React.FC<SettingsClientProps> = ({
  category,
}) => {
  const { loading, form, handleSubmit } = useEditCategory(category);
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Change category</FormLabel>
              <Input
                disabled={loading}
                placeholder="Edit category name here"
                className="col-span-3 w-full"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-3" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Edit
        </Button>
      </form>
    </Form>
  );
};
