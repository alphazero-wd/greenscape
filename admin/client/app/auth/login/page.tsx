import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/features/ui";
import { LoginClient } from "./login-client";
import Link from "next/link";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-gray-900 font-medium hover:underline"
            >
              Register here
            </Link>
          </CardDescription>
          <CardDescription>
            <Link
              className="text-gray-500 font-medium hover:underline"
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
