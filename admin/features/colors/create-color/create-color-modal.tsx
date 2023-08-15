"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/features/ui";
import { Loader2 } from "lucide-react";
import { ColorCircle } from "../circle";
import { useCreateColor } from "./use-create-color";
import { useCreateColorModal } from "./use-create-color-modal";

export const CreateColorModal = () => {
  const { isOpen, onClose } = useCreateColorModal();
  const { loading, handleSubmit, form } = useCreateColor();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create color</DialogTitle>
          <DialogDescription>
            Create new size so that customers can choose products that{" "}
            <b>match</b> their preferences
          </DialogDescription>
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
                  Create
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
