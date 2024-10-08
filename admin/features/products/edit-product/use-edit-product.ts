import { formSchema, useImagesUpload } from "@/features/products/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { Product, Status } from "../types";

export const useEditProduct = (product: Product) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      desc: "",
      categoryIds: [],
      slug: "",
      status: Status.Draft,
    },
  });
  const [loading, setLoading] = useState(false);
  const {
    prevImages,
    files,
    dropzoneState,
    createFilesFormData,
    deleteFile,
    populateImages,
    clearFiles,
  } = useImagesUpload();

  useEffect(() => {
    populateImages(product.images);
  }, [populateImages]);

  useEffect(() => {
    form.reset({
      categoryIds: product.categories.map((c) => c.id),
      slug: product.slug,
      desc: product.desc,
      name: product.name,
      inStock: product.inStock,
      price: product.price,
      status: product.status,
    });
  }, [product]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (prevImages.length + files.length === 0) {
      toast.error("Please upload at least an image");
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const formData = createFilesFormData();
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

      const existingImageIds = new Set(prevImages.map((img) => img.file.id));
      const deletedImages = product.images
        .map((image) => image.file.id)
        .filter((imageId) => !existingImageIds.has(imageId));
      if (deletedImages.length > 0)
        await axios.delete(
          `${API_URL}/products/${
            product.id
          }/remove-images?ids=${deletedImages.join(",")}`,
          { withCredentials: true },
        );
      toast.success("Product updated");
      form.reset({
        name: "",
        desc: "",
        categoryIds: [],
        slug: "",
        status: Status.Draft,
      });
      clearFiles();
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
    deleteFile,
    prevImages,
  };
};
