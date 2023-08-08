import axios from "axios";
import { toast } from "react-hot-toast";

export const useSwitchFeatured = () => {
  const switchFeatured = async (billboardId: string, isFeatured: boolean) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/billboards/${billboardId}`,
        { isFeatured },
        { withCredentials: true },
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { switchFeatured };
};
