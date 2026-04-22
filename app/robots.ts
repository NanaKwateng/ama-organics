import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/_next/",
                    "/admin/",
                ],
            },
            {
                // Block AI scrapers
                userAgent: [
                    "GPTBot",
                    "ChatGPT-User",
                    "CCBot",
                    "anthropic-ai",
                    "Claude-Web",
                ],
                disallow: "/",
            },
        ],
        sitemap: "https://www.amaorganics.com/sitemap.xml",
        host: "https://www.amaorganics.com",
    };
}