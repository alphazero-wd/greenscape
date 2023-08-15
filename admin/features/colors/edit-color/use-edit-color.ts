"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Color } from "../types";
import { useEditColorModal } from "./use-edit-color-modal";

const formSchema = z.object({
  hexCode: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6})$/, { message: "Invalid hex color provided" }),
});

export const useEditColor = (color: Color | null) => {
  const [loading, setLoading] = useState(false);
  const { onClose } = useEditColorModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (color) form.reset({ hexCode: color.hexCode });
  }, [color]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/colors/${color?.id}`,
        values,
        { withCredentials: true },
      );
      toast.success("Color updated");
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
