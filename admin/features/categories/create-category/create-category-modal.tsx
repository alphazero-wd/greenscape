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
import { useCreateCategory } from "./use-create-category";
import { useCreateCategoryModal } from "./use-create-category-modal";

interface CreateCategoryModalProps {
  pid?: number;
}

export const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  pid,
}) => {
  const { isOpen, onClose } = useCreateCategoryModal();
  const { loading, handleSubmit, form } = useCreateCategory(pid);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            Create new category for better products filtering
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="py-4">
                  <div className="grid grid-cols-4 items-center">
                    <FormLabel className="flex-1">Category</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Category"
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
