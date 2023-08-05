"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Color } from "../types";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Color name must be between 1 and 20 characters" })
    .max(20, { message: "Color name must be between 1 and 20 characters" }),

  hexCode: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid hex color code",
  }),
});

export const useEditColor = (color: Color) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: color.name, hexCode: color.hexCode },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/colors/${color.id}`,
        values,
        { withCredentials: true },
      );
      toast.success("Color updated");
      router.refresh();
      setTimeout(() => router.push(`/store/${color.storeId}/colors`), 1000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
