import { NextLayout } from "@/types/common";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import Navbar from "@/components/navbar";

const selectedFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flyingshoe",
  description: "Web app collection",
};

export default function RootLayout({ children }: NextLayout) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#FFF" />
      <link rel="manifest" href="/manifest.json" />
      <body /* className={selectedFont.className} */>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
