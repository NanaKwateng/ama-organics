"use client"

import dynamic from "next/dynamic";

const LusionExperience = dynamic(
    () => import("@/components/pages/Lusion-experience"),
    { ssr: false }
);

export default function Experience() {
    return (
        <LusionExperience />
    )
}