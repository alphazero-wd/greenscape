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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/features/ui";
import { Loader2 } from "lucide-react";
import { ColorCircle } from "../color-circle";
import { useEditColor } from "./use-edit-color";
import { useEditColorModal } from "./use-edit-color-modal";

export const EditColorModal = () => {
  const { isOpen, onClose, id } = useEditColorModal();
  const { loading, handleSubmit, form } = useEditColor(id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit color</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="py-4">
                  <div className="grid grid-cols-4 items-center">
                    <FormLabel className="flex-1">Color name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Color name"
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
              name="hexCode"
              render={({ field }) => (
                <FormItem className="py-4">
                  <div className="grid grid-cols-4 items-center">
                    <FormLabel className="flex-1">Hex color code</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        maxLength={7}
                        placeholder="Hex color code e.g. #fff"
                        className="col-span-2"
                        {...field}
                      />
                    </FormControl>
                    <div className="ml-3">
                      <ColorCircle hexCode={field.value} />
                    </div>
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
