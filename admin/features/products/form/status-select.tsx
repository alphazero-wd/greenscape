import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/card";
import { FormField, FormItem, FormLabel } from "@/features/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProductFormDto, Status } from "../types";

interface StatusSelectProps {
  form: UseFormReturn<ProductFormDto, any, undefined>;
  loading: boolean;
}

export const StatusSelect = ({ form, loading }: StatusSelectProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel htmlFor="status">Status</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(newValue) =>
                    form.setValue("status", newValue as Status)
                  }
                  disabled={loading}
                >
                  <SelectTrigger id="status" aria-label="Select status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Status).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
