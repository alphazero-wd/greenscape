"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/logout", null, {
        withCredentials: true,
      });
      router.refresh();
      router.push("/auth/login");
      toast.success("Log out successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return { logout };
};
