import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Āagman - Your Multi-Agent Trading Team",
  description:
    "TradeFlow AI powered by Āagman - Your intelligent orchestrator coordinating specialist trading agents for profile discovery, strategy design, stock hunting, and execution planning.",
  icons: {
    icon: [
      { url: "/icon?v=2", type: "image/png", sizes: "32x32" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon?v=2", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icon.svg?v=2",
        color: "#19E299",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
