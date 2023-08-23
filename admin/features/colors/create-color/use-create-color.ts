"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCreateColorModal } from "./use-create-color-modal";

const formSchema = z.object({
  hexCode: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6})$/, { message: "Invalid hex color provided" }),
});

export const useCreateColor = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { onClose } = useCreateColorModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { hexCode: "#ffffff" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/colors`, values, {
        withCredentials: true,
      });
      toast.success("Color created");
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
