// /components/CoiledPath.tsx
"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CoiledPath() {
    const pathRef = useRef<SVGPathElement>(null)

    useEffect(() => {
        const path = pathRef.current
        if (!path) return

        const length = path.getTotalLength()

        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
        })

        gsap.to(path, {
            strokeDashoffset: 0,
            scrollTrigger: {
                trigger: path,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true,
            },
        })
    }, [])

    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 600"
        >
            <path
                ref={pathRef}
                d="M100,300 C200,100 400,500 600,300 S800,400 700,100"
                stroke="#4F6FFF"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    )
}