"use client";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/features/ui";
import { Loader2 } from "lucide-react";
import { Size } from "../types";
import { useEditSize } from "./use-edit-size";

interface SettingsClientProps {
  size: Size;
}

export const EditSizeForm: React.FC<SettingsClientProps> = ({ size }) => {
  const { loading, form, handleSubmit } = useEditSize(size);
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Change size label</FormLabel>
              <Input
                disabled={loading}
                placeholder="Edit size label here"
                className="col-span-3 w-full"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="desc">Size description</FormLabel>
              <Textarea
                disabled={loading}
                placeholder="Add a description..."
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
