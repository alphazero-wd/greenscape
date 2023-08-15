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
import { useCreateSize } from "./use-create-size";
import { useCreateSizeModal } from "./use-create-size-modal";

export const CreateSizeModal = () => {
  const { isOpen, onClose } = useCreateSizeModal();
  const { loading, handleSubmit, form } = useCreateSize();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create size</DialogTitle>
          <DialogDescription>
            Create new size so that customers can choose products that{" "}
            <b>fit</b> them
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="py-4">
                  <div className="grid grid-cols-4 items-center">
                    <FormLabel className="flex-1">Size label</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Size label"
                        {...field}
                        className="col-span-3 w-full"
                      />
                    </FormControl>
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
