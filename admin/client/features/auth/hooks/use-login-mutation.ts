import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(1, { message: "Password must not be empty" }),
});

export const useLoginMutation = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        values,
        { withCredentials: true }
      );
      toast.success("Login successfully");
      form.reset();
      setTimeout(() => router.push("/"), 1000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  const loginMutation = useMutation({
    mutationFn: form.handleSubmit(onSubmit),
  });

  return { form, loginMutation };
};
