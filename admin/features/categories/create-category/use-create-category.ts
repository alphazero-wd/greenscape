"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCreateCategoryModal } from "./use-create-category-modal";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name must be between 1 and 60 characters" })
    .max(60, { message: "Category name must be between 1 and 60 characters" }),
  parentCategoryId: z.number().int().gte(1).optional(),
});

export const useCreateCategory = (pid?: number) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { onClose } = useCreateCategoryModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", parentCategoryId: pid },
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
