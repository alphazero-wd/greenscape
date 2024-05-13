import { formSchema } from "@/features/products/form";
import { FilePreview } from "@/features/products/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

export const useCreateProduct = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", desc: "", status: "Draft", categoryIds: [] },
  });
  const [files, setFiles] = useState<FilePreview[]>([]);
  const dropzoneState = useDropzone({
    multiple: true,
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });
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
      setFiles([]);
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
  };
};
