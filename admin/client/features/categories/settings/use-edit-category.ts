"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Category } from "../types";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name must be between 1 and 20 characters" })
    .max(20, { message: "Category name must be between 1 and 20 characters" }),
});

export const useEditCategory = (category: Category) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: category.name },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}`,
        values,
        { withCredentials: true },
      );
      toast.success("Category updated");
      router.refresh();
      setTimeout(
        () => router.push(`/store/${category.storeId}/categories`),
        1000,
      );
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
