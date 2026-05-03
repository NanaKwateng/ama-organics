"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MainPage from "./MainPage";
import { Onboarding } from "./Onboarding";

export default function Home() {
    const [hasLoaded, setHasLoaded] = useState(true); // Default to true to prevent flash
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const sessionSeen = sessionStorage.getItem("onboarding_seen");
        if (!sessionSeen) {
            setHasLoaded(false);
        }
    }, []);

    const handleComplete = () => {
        sessionStorage.setItem("onboarding_seen", "true");
        setHasLoaded(true);
    };

    if (!isClient) return null;

    return (
        <>
            <AnimatePresence mode="wait">
                {!hasLoaded && (
                    <Onboarding key="loader" onComplete={handleComplete} />
                )}
            </AnimatePresence>

            {hasLoaded && <MainPage />}
        </>
    );
}