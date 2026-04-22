
import AmaProductShowcase from "@/components/pages/Products";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Products", // → becomes "Our Products | Ama Organics"
    description:
        "Browse our full range of organic Ghanaian staples. Pure palm oil, smoked fish, cereals, fruits, and more. All sourced directly from Ghanaian farms.",
    alternates: {
        canonical: "https://www.amaorganics.com/products",
    },
    openGraph: {
        title: "Our Products | Ama Organics",
        description: "Browse organic Ghanaian staples. Farm to table.",
        url: "https://www.amaorganics.com/products",
        images: [{ url: "/og-products.jpg" }],
    },
};

export default function ProductsPage() {
    return (
        <div className="w-full">
            <AmaProductShowcase />
        </div>
    );
}