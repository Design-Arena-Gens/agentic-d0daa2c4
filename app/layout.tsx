import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Axeclusive LinkedIn Content Manager",
  description: "30-day LinkedIn content calendar for Axeclusive corporate events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
