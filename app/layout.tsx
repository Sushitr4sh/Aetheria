import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({ src: "./Sequel Sans Roman Disp.ttf" });

export const metadata: Metadata = {
  title: "Aetheria",
  description: "Your mental health companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} relative`}>{children}</body>
    </html>
  );
}
