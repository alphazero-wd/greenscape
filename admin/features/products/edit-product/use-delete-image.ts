"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDeleteImageModal } from "./use-delete-image-modal";

export const useDeleteImage = () => {
  const [loading, setLoading] = useState(false);
  const { onClose } = useDeleteImageModal();
  const router = useRouter();
  const deleteImage = async (productId: number, imageId: number) => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/remove/${imageId}`,
        { withCredentials: true },
      );
      toast.success("Image removed");
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteImage };
};
