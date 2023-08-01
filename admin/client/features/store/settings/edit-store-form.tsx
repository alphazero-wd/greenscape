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
import { useEditStore } from "../hooks";
import { Store } from "../types/store";
import { Loader2 } from "lucide-react";

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
                className="w-full col-span-3"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-3" disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};
