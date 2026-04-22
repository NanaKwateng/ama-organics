// components/ui/AnimationReady.tsx
// Wrap sections that have heavy animations
"use client";
import { useEffect, useState } from "react";

export function AnimationReady({
    children,
    delay = 100
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Wait for DOM + assets to settle
        const timer = setTimeout(() => setReady(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div style={{ visibility: ready ? "visible" : "hidden" }}>
            {children}
        </div>
    );
}