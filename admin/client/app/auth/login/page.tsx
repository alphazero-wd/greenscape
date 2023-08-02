import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginClient } from "./login-client";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Log in to admin dashboard</CardTitle>
          <CardDescription>
            <Link
              className="font-medium text-gray-500 hover:underline"
              href="/auth/forgot-password"
            >
              Forgot your password?
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginClient />
        </CardContent>
      </Card>
    </div>
  );
}
