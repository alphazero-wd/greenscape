"use client";
import axios from "axios";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { useCreateBillboardModal } from "./use-create-billboard-modal";

interface CreateBillboardDto {
  image: File;
  isFeatured: boolean;
  storeId: string;
}

export const useCreateBillboard = ({
  image,
  isFeatured,
  storeId,
}: CreateBillboardDto) => {
  const [loading, setLoading] = useState(false);
  const { onClose } = useCreateBillboardModal();
  const createBillboard: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("isFeatured", String(isFeatured));
    formData.append("storeId", storeId);
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/billboards`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      toast.success("Billboard created");
      onClose();
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createBillboard };
};
