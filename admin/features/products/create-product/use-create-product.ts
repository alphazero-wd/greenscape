import { formSchema, useImagesUpload } from "@/features/products/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

export const useCreateProduct = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", desc: "", status: "Draft", categoryIds: [] },
  });
  const { clearFiles, deleteFile, createFilesFormData, dropzoneState, files } =
    useImagesUpload();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const formData = createFilesFormData();

      setLoading(true);
      const {
        data: { data },
      } = await axios.post(API_URL + "/products", values, {
        withCredentials: true,
      });
      await axios.patch(
        `${API_URL}/products/${data.id}/upload-images`,
        formData,
        { withCredentials: true },
      );
      form.reset();
      clearFiles();
      toast.success("Product created");
      router.refresh();
      router.replace("/products");
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
  };
};
