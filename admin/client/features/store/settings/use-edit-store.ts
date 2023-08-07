"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCreateStoreModal } from "../create-store";
import { Store } from "../types";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Store name must be between 1 and 64 characters" })
    .max(64, { message: "Store name must be between 1 and 64 characters" }),
});

export const useEditStore = (store: Store) => {
  const [loading, setLoading] = useState(false);
  const { onClose } = useCreateStoreModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: store.name },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/stores/${store.id}`,
        values,
        { withCredentials: true },
      );
      toast.success("Store updated");
      form.reset();
      onClose();

      setTimeout(() => {
        router.refresh();
        router.push(`/store/${store.id}`);
      }, 1000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
