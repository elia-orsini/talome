import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import type { Viewport } from "next";

const unica77Bold = localFont({ src: "./unica77-Bold.woff2" });

export const metadata: Metadata = {
  title: "Talome",
  description:
    "Talome is a talent agency dedicated to representing and elevating exceptional talent. We build lasting relationships and shape impactful creative moments. Providing structure and support, we help talent grow and succeed. Through a refined approach, we cultivate talent with purpose. Talome facilitates talent with clarity and direction.",
  icons: {
    icon: "/talome.svg",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unica77Bold.className} no-scrollbar overflow-clip antialiased`}>
        {children}
      </body>
    </html>
  );
}
