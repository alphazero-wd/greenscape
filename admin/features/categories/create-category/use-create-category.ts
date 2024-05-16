"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { formSchema } from "../form";
import { useCreateCategoryModal } from "./use-modal";

export const useCreateCategory = (parentCategoryId?: number) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { onClose } = useCreateCategoryModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", slug: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/`,
        { ...values, parentCategoryId },
        { withCredentials: true },
      );
      toast.success("Category created");
      form.reset();
      router.refresh();
      onClose();
    } catch (error: any) {
      const message: string = error?.response?.data?.message;
      if (message.includes("slug"))
        form.setError("slug", { message }, { shouldFocus: true });
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
