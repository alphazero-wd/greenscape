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
    .min(1, { message: "Product name must be between 1 and 120 characters" })
    .max(120, { message: "Product name must be between 1 and 120 characters" }),

  desc: z.string().nonempty({ message: "Please provide a description" }),
  price: z
    .number()
    .gt(0, { message: "Price cannot be negative or equal to 0" })
    .multipleOf(0.01, { message: "Price needs to have 2 decimal digits" }),
  inStock: z
    .number()
    .nonnegative({
      message: "The number of products in stock must be non-negative",
    })
    .int(),
  categoryId: z.number().int().gte(1),
  status: z.enum(["Active", "Draft"]),
});

export const useCreateProduct = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", desc: "", status: "Draft" },
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
