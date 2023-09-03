import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const useSetDelivered = (orderId: string, deliveredAt?: Date) => {
  const [delivered, setDelivered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setDelivered(!!deliveredAt);
  }, [deliveredAt]);

  const updateDeliveryStatus = async () => {
    try {
      if (deliveredAt) return;
      if (delivered) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
          { deliveredAt: new Date().toISOString() },
          {
            withCredentials: true,
          },
        );
        router.refresh();
        toast.success("Order set to delivered!");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return { setDelivered, delivered, updateDeliveryStatus };
};
