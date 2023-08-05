"use client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDeleteRecordsModal } from "./use-delete-records-modal";

export const useDeleteRecords = (ids: number[]) => {
  const router = useRouter();
  const { onClose } = useDeleteRecordsModal();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const deleteSelectedRows = async (
    entityName: "categories" | "colors" | "sizes" | "products" | "brands",
  ) => {
    try {
      setLoading(true);
      const segments = pathname.split("/"); // ['', store, :storeId, entityName, :entityNameId]

      const idsString = ids.join(",");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/${entityName}?ids=${idsString}`,
        { withCredentials: true },
      );
      onClose();

      setTimeout(() => {
        router.refresh();
        router.push(segments.slice(0, 4).join("/")); // redirects to /store/:storeId/<entityName>
      }, 1000);
      toast.success("Records deleted successfully");
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteSelectedRows,
    loading,
  };
};
