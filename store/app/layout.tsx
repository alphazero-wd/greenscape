import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/features/layout/toaster";
import { Navbar } from "@/features/layout/navbar";
import { iconMetadata } from "@/features/config";
import { Footer } from "@/features/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Greenscape | %s",
    default: "Greenscape | Add Life to Your Home with our Plants",
  },
  description: "Welcome to Greenscape",
  icons: iconMetadata,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
