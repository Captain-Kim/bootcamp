import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "나만의 포켓몬 도감",
  description: "나만의 포켓몬 도감입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <QueryProvider>
            {children}
        </QueryProvider>

      </body>
    </html>
  );
}
