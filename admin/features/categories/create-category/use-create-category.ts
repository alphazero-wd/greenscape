"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCategoriesStore } from "../context";
import { Category } from "../types";
import { useCreateCategoryModal } from "./use-create-category-modal";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name must be between 1 and 20 characters" })
    .max(20, { message: "Category name must be between 1 and 20 characters" }),
});

export const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const { onClose } = useCreateCategoryModal();
  const { createCategory } = useCategoriesStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/`,
        values,
        { withCredentials: true },
      );
      toast.success("Category created");
      form.reset();
      onClose();
      createCategory(data as Category);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
