"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCreateStoreModal } from "./use-create-store-modal";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Store name must be between 1 and 64 characters" })
    .max(64, { message: "Store name must be between 1 and 64 characters" }),
});

export const useCreateStore = () => {
  const [loading, setLoading] = useState(false);
  const { onClose } = useCreateStoreModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const {
        data: {
          data: { id },
        },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/stores`,
        values,
        { withCredentials: true },
      );
      toast.success("Store created");
      form.reset();
      router.refresh();
      onClose();
      setTimeout(() => router.push(`/store/${id}`), 1000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
