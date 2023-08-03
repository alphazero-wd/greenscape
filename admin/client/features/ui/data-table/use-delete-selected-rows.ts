"use client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useDeleteSelectedRows = (ids: number[]) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const deleteSelectedRows = async (
    entityName: "categories" | "colors" | "sizes" | "products",
  ) => {
    try {
      setLoading(true);
      const segments = pathname.split("/"); // /stores/:storeId/categories/:categoryId

      const idsString = ids.join(",");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/${entityName}?ids=${idsString}`,
        { withCredentials: true },
      );

      setTimeout(() => {
        router.push(segments.slice(0, -1).join("/"));
        router.refresh();
      }, 1000);
      toast.success("Records deleted successfully");
    } catch (error) {
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
