import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Ama Organics",
  description: "Pure Ghanaian Palm Oil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sora antialiased">
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
          }}
        >
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}