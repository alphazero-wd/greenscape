"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDeleteStoreModal } from "./use-delete-store-modal";

export const useDeleteStore = (id: number) => {
  const router = useRouter();
  const { onClose } = useDeleteStoreModal();
  const [loading, setLoading] = useState(false);

  const deleteStore = async () => {
    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/stores/${id}`, {
        withCredentials: true,
      });
      toast.success("Store removed");
      onClose();
      setTimeout(() => {
        router.refresh();
        router.push("/");
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteStore };
};
