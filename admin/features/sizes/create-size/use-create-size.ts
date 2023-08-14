"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useSizesStore } from "../context";
import { Size } from "../types";
import { useCreateSizeModal } from "./use-create-size-modal";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Size name must be between 1 and 20 characters" })
    .max(20, { message: "Size name must be between 1 and 20 characters" }),

  desc: z.string().optional(),
});

export const useCreateSize = () => {
  const [loading, setLoading] = useState(false);
  const { onClose } = useCreateSizeModal();
  const { createSize } = useSizesStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", desc: "" },
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
      toast.success("Size created");
      form.reset();
      onClose();
      createSize(data as Size);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
