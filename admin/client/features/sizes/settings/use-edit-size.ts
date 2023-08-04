"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Size } from "../types";

const formSchema = z.object({
  label: z
    .string()
    .min(1, { message: "Size label must be between 1 and 20 characters" })
    .max(20, { message: "Size label must be between 1 and 20 characters" }),

  desc: z.string().optional(),
});

export const useEditSize = (size: Size) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { label: size.label, desc: size.desc },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/sizes/${size.id}`,
        values,
        { withCredentials: true },
      );
      toast.success("Size updated");
      router.refresh();
      setTimeout(() => router.push(`/store/${size.storeId}/sizes`), 1000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
