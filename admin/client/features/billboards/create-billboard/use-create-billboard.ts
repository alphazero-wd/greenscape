"use client";
import axios from "axios";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { useBillboardsStore } from "../contexts";
import { useCreateBillboardModal } from "./use-create-billboard-modal";

interface CreateBillboardDto {
  image: File;
  isFeatured: boolean;
}

export const useCreateBillboard = ({
  image,
  isFeatured,
}: CreateBillboardDto) => {
  const [loading, setLoading] = useState(false);
  const { createBillboard: createBillboardUI } = useBillboardsStore();
  const { onClose } = useCreateBillboardModal();
  const createBillboard: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("isFeatured", String(isFeatured));
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/billboards`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      toast.success("Billboard created");
      createBillboardUI(data);
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createBillboard };
};
