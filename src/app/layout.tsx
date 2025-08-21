import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Video from "@/components/Video";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sudoku",
  description: "Generated Using Next Js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning style={{ backgroundColor: 'black' }}>
        <Video />
        <Toaster closeButton richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
