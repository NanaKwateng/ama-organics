import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import { Sora } from "next/font/google";
import { DrawerMenu } from "@/components/sections/Drawer";
import { Dropdown } from "@/components/sections/DropDown";
import Footer from "@/components/sections/Footer";
import { FaLeaf } from "react-icons/fa";

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
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-3 mix-blend-difference">
            <div className="text-xs">
              <FaLeaf />
            </div>
            <div className="flex items-center gap-3">
              <Dropdown />
              <DrawerMenu />
            </div>
          </nav>
          {children}
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}