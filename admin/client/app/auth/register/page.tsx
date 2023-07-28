import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/features/ui";
import { RegisterClient } from "./register-client";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-gray-900 font-medium hover:underline"
            >
              Log in here
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterClient />
        </CardContent>
      </Card>
    </div>
  );
}
