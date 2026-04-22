import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Ama Organics",
        short_name: "Ama Organics",
        description: "Pure Ghanaian Palm Oil & Organic Foods",
        start_url: "/",
        display: "standalone",
        background_color: "#fdfaf6",
        theme_color: "#000000",
        icons: [
            {
                src: "/favicon/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                src: "/favicon/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}