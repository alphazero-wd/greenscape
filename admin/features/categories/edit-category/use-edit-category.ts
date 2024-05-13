"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { formSchema } from "../form";
import { Category } from "../types";
import { useEditCategoryModal } from "./use-modal";

export const useEditCategory = (category: Category | null) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { onClose } = useEditCategoryModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (category) {
      form.setValue("name", category.name);
      form.setValue("slug", category.slug);
    }
  }, [category]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${category?.id}`,
        values,
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
