"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCategoriesStore } from "../context";
import { useEditCategoryModal } from "./use-edit-category-modal";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name must be between 1 and 20 characters" })
    .max(20, { message: "Category name must be between 1 and 20 characters" }),
  parentCategoryId: z.number().int().gte(1).optional(),
});

export const useEditCategory = (id: number) => {
  const [loading, setLoading] = useState(false);
  const { categories } = useCategoriesStore();
  const router = useRouter();
  const { onClose } = useEditCategoryModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const category = useMemo(
    () => categories.find((c) => c.id === id),
    [categories, id],
  );

  useEffect(() => {
    if (category)
      form.reset({
        name: category.name,
        parentCategoryId: category.parentCategoryId,
      });
  }, [category]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
        { ...values },
        { withCredentials: true },
      );
      toast.success("Category updated");
      router.refresh();
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
