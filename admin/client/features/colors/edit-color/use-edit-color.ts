"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useColorsStore } from "../context";
import { useEditColorModal } from "./use-edit-color-modal";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Color name must be between 1 and 20 characters" })
    .max(20, { message: "Color name must be between 1 and 20 characters" }),

  hexCode: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid hex color code",
  }),
});

export const useEditColor = (id: number) => {
  const [loading, setLoading] = useState(false);
  const { colors, updateColor } = useColorsStore();
  const { onClose } = useEditColorModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const color = useMemo(() => colors.find((c) => c.id === id), [colors, id]);

  useEffect(() => {
    if (color) form.reset({ name: color.name, hexCode: color.hexCode });
  }, [color]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/colors/${id}`,
        values,
        { withCredentials: true },
      );
      toast.success("Color updated");
      updateColor(id, data);
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
