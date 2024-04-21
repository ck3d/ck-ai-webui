import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({ src: "../InterVariable.ttf" })

export const metadata: Metadata = {
  title: "CK AI WebUI",
  description: "Simple WebUI for OpenAI compatible APIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
