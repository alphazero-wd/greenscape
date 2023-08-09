import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "../features/ui";
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
        <Toaster />
        {children}
      </body>
    </html>
  );
}
