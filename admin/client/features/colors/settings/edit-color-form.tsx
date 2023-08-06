"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/features/ui";
import { Loader2 } from "lucide-react";
import { ColorCircle } from "../color-circle";
import { Color } from "../types";
import { useEditColor } from "./use-edit-color";

interface SettingsClientProps {
  color: Color;
}

export const EditColorForm: React.FC<SettingsClientProps> = ({ color }) => {
  const { loading, form, handleSubmit } = useEditColor(color);
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex-1">Color name</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Color label"
                  {...field}
                  className="col-span-3 w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hexCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hex color code</FormLabel>
              <div className="flex items-center gap-x-3">
                <FormControl>
                  <Input
                    disabled={loading}
                    maxLength={7}
                    placeholder="Hex color code e.g. #fff"
                    {...field}
                    className="col-span-2 w-full"
                  />
                </FormControl>

                <ColorCircle hexCode={field.value} />
              </div>
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
