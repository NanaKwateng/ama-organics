"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";

// 1. Rotating Circular Text Component
export function RotatingLogo() {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="relative size-20 flex items-center justify-center"
        >
            <svg viewBox="0 0 100 100" className="size-full overflow-visible">
                <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                />
                <text className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    <textPath href="#circlePath">
                        Ama Organic Foods • Vital •
                    </textPath>
                </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <Play className="size-3 fill-black" />
            </div>
        </motion.div>
    );
}

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Increased stiffness and reduced damping for a more "physical" feel
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    // Increased rotation to 25 degrees for more "depth"
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

    const handleMove = (e: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
                rotateX,
                rotateY,
                perspective: 1000, // Adds the 3D depth effect
                transformStyle: "preserve-3d"
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)" }} className="size-full">
                {children}
            </div>
        </motion.div>
    );
}