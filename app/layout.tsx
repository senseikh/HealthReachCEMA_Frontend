import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainLayoutProps } from "../types";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Information System",
  description: "Manage health programs and clients",
};

export default function RootLayout({ children }: MainLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
