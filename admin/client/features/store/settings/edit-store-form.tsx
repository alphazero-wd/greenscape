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
import { useEditStore } from "../hooks";
import { Store } from "../types/store";

interface SettingsClientProps {
  store: Store;
}

export const EditStoreForm: React.FC<SettingsClientProps> = ({ store }) => {
  const { loading, form, handleSubmit } = useEditStore(store);
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Change store name</FormLabel>
              <Input
                disabled={loading}
                placeholder="Edit store name here"
                className="col-span-3 w-full"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-3" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};
