// This tells Google EXACTLY what your business is
// Renders rich results (star ratings, business info in search)

export function OrganizationJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ama Organics",
        url: "https://www.ama-organics.com",
        logo: "https://www.ama-organics.com/images/logo.png",
        description:
            "Pure, organic Ghanaian palm oil and farm-fresh produce delivered nationwide.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Accra",
            addressCountry: "GH",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+233538616763",
            contactType: "customer service",
            availableLanguage: "English",
        },
        sameAs: [
            "https://instagram.com/ama-organics",
            "https://twitter.com/ama-organics",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export function ProductJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Pure Ghanaian Palm Oil",
        image: "https://www.ama-organics.com/images/product.png",
        description:
            "100% cold-pressed, organic Ghanaian palm oil. No additives or preservatives.",
        brand: {
            "@type": "Brand",
            name: "Ama Organics",
        },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "GHS",
            seller: {
                "@type": "Organization",
                name: "Ama Organics",
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}