import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage_grotesque = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-bricolage_grotesque",
});

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
      <body className={`${bricolage_grotesque.variable} font-sans `}>
        {children}
      </body>
    </html>
  );
}
