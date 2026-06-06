import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";
import { AuthProvider } from "../app/context/AuthContext";
import { FontSizeProvider } from "../app/context/FontSizeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summarist Replica by Shai GW",
  description: "Learn from the world's best books in 15 minutes with Summarist, an audiobook summary app. This is a replica of the original Summarist app, built using Next.js and Firebase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <FontSizeProvider>
            {children}
          </FontSizeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
