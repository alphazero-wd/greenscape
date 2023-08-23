"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/features/ui";
import { GetColorName } from "hex-color-to-color-name";
import { Loader2 } from "lucide-react";
import { ColorCircle } from "../circle";
import { useEditColor } from "./use-edit-color";
import { useEditColorModal } from "./use-edit-color-modal";

export const EditColorModal = () => {
  const { isOpen, onClose, currentColor } = useEditColorModal();
  const { loading, handleSubmit, form } = useEditColor(currentColor);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit color</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="hexCode"
              render={({ field }) => (
                <FormItem className="py-4">
                  <div className="grid grid-cols-4 items-center gap-3">
                    <FormLabel className="flex-1">Hex code</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        maxLength={7}
                        placeholder="Hex code"
                        {...field}
                        className="col-span-2 w-full"
                      />
                    </FormControl>
                    <ColorCircle color={field.value} />
                  </div>
                  <FormDescription className="my-2">
                    {GetColorName(field.value)}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex items-center gap-x-4">
                <Button
                  onClick={onClose}
                  disabled={loading}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Edit
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
