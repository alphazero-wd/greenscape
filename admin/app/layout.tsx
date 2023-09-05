import { Toaster } from "@/features/ui";
import Navbar from "@/features/ui/navbar/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Admin | %s",
    default: "Admin",
  },
  description: "Welcome to the admin page",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Toaster />
        <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
