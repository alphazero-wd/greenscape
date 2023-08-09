"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useSizesStore } from "../context";
import { useEditSizeModal } from "./use-edit-size-modal";

const formSchema = z.object({
  label: z
    .string()
    .min(1, { message: "Size label must be between 1 and 20 characters" })
    .max(20, { message: "Size label must be between 1 and 20 characters" }),
});

export const useEditSize = (id: number) => {
  const [loading, setLoading] = useState(false);
  const { sizes, updateSize } = useSizesStore();
  const { onClose } = useEditSizeModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const size = useMemo(() => sizes.find((c) => c.id === id), [sizes, id]);

  useEffect(() => {
    if (size) form.reset({ label: size.label });
  }, [size]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/sizes/${id}`,
        values,
        { withCredentials: true },
      );
      toast.success("Size updated");
      updateSize(id, data);
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) };
};
