import { formSchema } from "@/features/products/form";
import { FilePreview } from "@/features/products/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { Product } from "../types";

export const useEditProduct = (product: Product) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      desc: "",
      categoryIds: [],
    },
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
  const [tempImages, setTempImages] = useState<Product["images"]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTempImages(product.images);
  }, [product.images]);

  useEffect(() => {
    form.reset({
      categoryIds: product.categories.map((c) => c.id),
      desc: product.desc,
      name: product.name,
      inStock: product.inStock,
      price: product.price,
      status: product.status,
    });
  }, [product]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (tempImages.length + files.length === 0) {
      toast.error("Please upload at least 1 image");
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
      const deletedImages = product.images
        .map((image) => image.file.id)
        .filter(
          (imageId) => !tempImages.map((img) => img.file.id).includes(imageId),
        );
      if (deletedImages.length > 0)
        await axios.delete(
          `${API_URL}/products/${
            product.id
          }/remove-images?ids=${deletedImages.join(",")}`,
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
    tempImages,
    setTempImages,
  };
};
