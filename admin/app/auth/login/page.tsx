import { LoginForm } from "@/features/auth/login/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Log in to your account",
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[500px]">
        <CardContent>
          <CardHeader>
            <CardTitle>Log in to admin dashboard</CardTitle>
          </CardHeader>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
