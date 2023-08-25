import { FilePreview } from "@/features/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { Product } from "../types";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name must be between 1 and 120 characters" })
    .max(120, { message: "Product name must be between 1 and 120 characters" }),

  desc: z.string().nonempty({ message: "Please provide a description" }),
  price: z.coerce
    .number()
    .gt(0, { message: "Price cannot be negative or equal to 0" })
    .multipleOf(0.01, { message: "Price needs to have 2 decimal digits" }),
  inStock: z.coerce
    .number()
    .nonnegative({
      message: "The number of products in stock must be non-negative",
    })
    .int(),
  categoryId: z.number().int().gte(1),
  status: z.enum(["Active", "Draft"]),
});

export const useEditProduct = (product: Product) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [files, setFiles] = useState<FilePreview[]>([]);
  const dropzoneState = useDropzone({
    multiple: true,
    maxFiles: 4,
    maxSize: Math.pow(1024, 2) * 5, // 5MB
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.reset({
      categoryId: product.category.id,
      desc: product.desc,
      name: product.name,
      inStock: product.inStock,
      price: product.price,
      status: product.status,
    });
  }, [product]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (product.images.length + files.length > 4) {
      toast.error(
        `The product already has ${product.images.length} images. ${
          product.images.length === 4
            ? "You cannot upload any more images"
            : `You can only upload ${4 - product.images.length} images left.`
        }`,
      );
      return;
    }
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });
      setLoading(true);
      await axios.patch(API_URL + "/products/" + product.id, values, {
        withCredentials: true,
      });
      if (files.length > 0)
        await axios.patch(
          `${API_URL}/products/${product.id}/upload-images`,
          formData,
          { withCredentials: true },
        );
      toast.success("Product updated");
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
    dropzoneState,
    files,
  };
};
