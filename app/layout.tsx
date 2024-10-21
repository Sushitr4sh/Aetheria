import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/components/utilities/Provider";

const fontSans = localFont({ src: "./font/Sequel Sans Roman Disp.ttf" });

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
      <body className={`${fontSans.className} relative`}>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
