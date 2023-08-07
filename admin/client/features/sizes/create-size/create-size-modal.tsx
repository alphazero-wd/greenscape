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
  Textarea,
} from "@/features/ui";
import { Loader2 } from "lucide-react";
import React from "react";
import { useCreateSize } from "./use-create-size";
import { useCreateSizeModal } from "./use-create-size-modal";

interface CreateSizeModalProps {
  storeId: number;
}

export const CreateSizeModal: React.FC<CreateSizeModalProps> = ({
  storeId,
}) => {
  const { isOpen, onClose } = useCreateSizeModal();
  const { loading, handleSubmit, form } = useCreateSize(storeId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create size</DialogTitle>
          <DialogDescription>
            Create new size for better fitability (usually for clothes, shoes)
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="py-4">
                  <div className="grid grid-cols-4">
                    <FormLabel className="flex-1">Size description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Size description"
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
