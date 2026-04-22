// components/ui/VideoWithFallback.tsx
"use client";
import { useRef, useState, useEffect } from "react";

interface VideoWithFallbackProps {
    src: string;
    fallbackImage?: string; // Show image until video loads
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    priority?: boolean; // Load immediately vs lazy
}

export default function VideoWithFallback({
    src,
    fallbackImage,
    className = "",
    autoPlay = true,
    loop = true,
    muted = true,
    priority = false,
}: VideoWithFallbackProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // ✅ Only play when enough data is buffered
        const handleCanPlay = () => {
            setIsLoaded(true);
            if (autoPlay) {
                video.play().catch(() => {
                    // Autoplay blocked → show fallback
                    setHasError(true);
                });
            }
        };

        const handleError = () => setHasError(true);

        video.addEventListener("canplaythrough", handleCanPlay);
        video.addEventListener("error", handleError);

        return () => {
            video.removeEventListener("canplaythrough", handleCanPlay);
            video.removeEventListener("error", handleError);
        };
    }, [autoPlay]);

    return (
        <div className="relative w-full h-full">
            {/* Fallback image shown while video loads */}
            {fallbackImage && !isLoaded && (
                <img
                    src={fallbackImage}
                    alt="Loading video..."
                    className={`absolute inset-0 w-full h-full object-cover ${className}`}
                />
            )}

            {/* Skeleton shimmer when no fallback image */}
            {!fallbackImage && !isLoaded && (
                <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
            )}

            {/* The actual video */}
            {!hasError && (
                <video
                    ref={videoRef}
                    src={src}
                    loop={loop}
                    muted={muted}
                    playsInline
                    // ✅ preload="metadata" on non-priority (loads first frame only)
                    // ✅ preload="auto" on priority (loads full video immediately)
                    preload={priority ? "auto" : "metadata"}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
                        } ${className}`}
                />
            )}

            {/* If video completely fails, show fallback permanently */}
            {hasError && fallbackImage && (
                <img
                    src={fallbackImage}
                    alt="Video unavailable"
                    className={`w-full h-full object-cover ${className}`}
                />
            )}
        </div>
    );
}