import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Size name must be between 1 and 120 characters" })
    .max(120, { message: "Size name must be between 1 and 120 characters" }),

  desc: z.string().nonempty({ message: "Please provide a description" }),
  categoryIds: z
    .number()
    .array()
    .length(3, { message: "Please specify the category" }),
  colorIds: z.number().array().optional(),
  sizeIds: z.number().array().optional(),
});

export const useCreateProduct = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", desc: "" },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/products", values, { withCredentials: true });
      toast.success("Product created");
      router.refresh();
      router.push("/products");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
