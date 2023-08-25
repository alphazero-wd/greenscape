"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDeleteRecordsModal } from "./use-delete-records-modal";

export const useDeleteRecords = () => {
  const { onClose, ids } = useDeleteRecordsModal();
  const [loading, setLoading] = useState(false);
  const deleteRecords = async (entityName: "categories" | "products") => {
    try {
      setLoading(true);
      const idsString = ids.join(",");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/${entityName}?ids=${idsString}`,
        { withCredentials: true },
      );
      onClose();

      toast.success("Records deleted successfully");
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { deleteRecords, loading };
};
