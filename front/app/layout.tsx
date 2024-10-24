import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JBlog",
  description: "Blog specifically for Jee Hwan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
