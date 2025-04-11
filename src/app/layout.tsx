import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import type { Viewport } from "next";

const UniversLTStdBold = localFont({ src: "./UniversLTStd-Bold.woff2" });

export const metadata: Metadata = {
  title: "Talome",
  description:
    "Talome is a talent agency dedicated to representing and elevating exceptional talent. We build lasting relationships and shape impactful creative moments. Providing structure and support, we help talent grow and succeed. Through a refined approach, we cultivate talent with purpose. Talome facilitates talent with clarity and direction.",
  icons: {
    icon: "/talome.svg",
  },
  openGraph: {
    title: "Talome",
    description:
      "Talome is a talent agency dedicated to representing and elevating exceptional talent. We build lasting relationships and shape impactful creative moments. Providing structure and support, we help talent grow and succeed. Through a refined approach, we cultivate talent with purpose. Talome facilitates talent with clarity and direction.",
    images: [
      {
        url: "/talome.png",
        width: 500,
        height: 500,
        alt: "Talome",
      },
    ],
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
      <body className={`${UniversLTStdBold.className} no-scrollbar overflow-clip antialiased`}>
        {children}
      </body>
    </html>
  );
}
