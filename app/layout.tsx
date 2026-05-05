import type { Metadata, Viewport } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import { Sora } from "next/font/google";
import { DrawerMenu } from "@/components/sections/Drawer";
import { Dropdown } from "@/components/sections/DropDown";
import Footer from "@/components/sections/Footer";
import { FaLeaf } from "react-icons/fa";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { RotatingLogo } from "@/components/sections/TiltCards";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap", // ← Prevents font flash & improves CLS score
});

const BASE_URL = "https://www.ama-organics.com";

// ✅ Viewport export (Next.js 14+ separates this from metadata)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  // --- Core ---
  metadataBase: new URL(BASE_URL), // Required for absolute OG image URLs
  title: {
    default: "Ama Organics | Pure Ghanaian Palm Oil & Organic Foods",
    template: "%s | Ama Organics", // Pages can set their own title
  },
  description:
    "Ama Organics delivers 100% pure, cold-pressed Ghanaian palm oil, hardwood-smoked fish, organic cereals, and fresh produce. Sourced directly from Ghanaian farms. Nationwide delivery.",

  // --- Keywords ---
  keywords: [
    "Ghanaian palm oil",
    "organic palm oil Ghana",
    "pure red palm oil",
    "buy palm oil online Ghana",
    "Ama Organics",
    "cold pressed palm oil",
    "smoked fish Ghana",
    "organic food Ghana",
    "Ghanaian organic food delivery",
    "palm kernel oil Ghana",
    "healthy cooking oil Ghana",
    "natural food Ghana",
  ],

  // --- Authorship ---
  authors: [{ name: "Ama Organics", url: BASE_URL }],
  creator: "Ama Organics",
  publisher: "Ama Organics",

  // --- Canonical URL ---
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-GH": BASE_URL, // Ghana English
      "en-US": BASE_URL,
    },
  },

  // --- Open Graph (Facebook, WhatsApp, LinkedIn previews) ---
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: BASE_URL,
    siteName: "Ama Organics",
    title: "Ama Organics | Pure Ghanaian Palm Oil & Organic Foods",
    description:
      "100% organic, cold-pressed palm oil and fresh Ghanaian produce. No additives. No chemicals. Delivered nationwide.",
    images: [
      {
        url: "/images/product.png", // ← create this: 1200x630px image
        width: 1200,
        height: 630,
        alt: "Ama Organics - Pure Ghanaian Palm Oil",
        type: "image/png",
      },
    ],
  },

  // --- Twitter/X Card ---
  twitter: {
    card: "summary_large_image",
    title: "Ama Organics | Pure Ghanaian Palm Oil",
    description:
      "100% organic Ghanaian palm oil. Cold-pressed, nutrient-rich. Order now.",
    images: ["/og-image.jpg"],
    creator: "@amaorganics", // update with real handle
  },

  // --- Indexing ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // --- App/PWA ---
  applicationName: "Ama Organics",
  category: "food",

  // --- Verification (add after verifying in Google Search Console) ---
  verification: {
    google: "google62dbb39b71ae4601.html", // from Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GH" className={`${sora.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sora antialiased">
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
          }}
        >
          <nav className="flex items-center justify-between mb-12 px-6 md:px-12 py-3">
            <div className="w-20"><RotatingLogo /></div>
            <div className="hidden md:flex gap-10 font-bold text-sm tracking-tight">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Shop", href: "/products" },
                { name: "Contact us", href: "/contact" }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:opacity-60 transition-opacity"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Dropdown />
              <DrawerMenu />
            </div>
          </nav>
          <OrganizationJsonLd />
          {children}
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}