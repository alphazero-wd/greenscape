"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "First name must be between 1 and 20 characters.",
    })
    .max(20, { message: "First name must be between 1 and 20 characters." }),
  lastName: z
    .string()
    .min(1, {
      message: "Last name must be between 1 and 30 characters.",
    })
    .max(30, { message: "Last name must be between 1 and 30 characters." }),
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "Password is not strong enough" }
    ),
});

export const useREgisterMutation = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        values
      );
      toast.success("Register successfully. Please log in");
      form.reset();
      setTimeout(() => router.push("/auth/login"), 1000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  const registerMutation = useMutation({
    mutationFn: form.handleSubmit(onSubmit),
  });
  return { registerMutation, form };
};
