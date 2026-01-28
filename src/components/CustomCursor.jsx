"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const [isLongIdle, setIsLongIdle] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring physics for component following
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        let idleTimer;
        let longIdleTimer;

        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Reset idle states on movement
            setIsIdle(false);
            setIsLongIdle(false);

            clearTimeout(idleTimer);
            clearTimeout(longIdleTimer);

            // Set timers for idle states
            idleTimer = setTimeout(() => setIsIdle(true), 1000); // 1s for 3D Heart
            longIdleTimer = setTimeout(() => setIsLongIdle(true), 4000); // 4s for "Y'Ass"
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            clearTimeout(idleTimer);
            clearTimeout(longIdleTimer);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
            style={{ x: cursorX, y: cursorY }}
        >
            <AnimatePresence mode="wait">

                {/* State 1: Moving (Small Pink Dot / Heart) */}
                {!isIdle && (
                    <motion.div
                        key="moving"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: isHovering ? 0.8 : 1,
                            opacity: 1
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="relative"
                    >
                        {/* Glowing core */}
                        <div className={`w-4 h-4 rounded-full bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.8)] ${isHovering ? 'scale-75' : ''}`} />

                        {/* Trail particles could be complex, sticking to simple glow for perf */}
                    </motion.div>
                )}

                {/* State 2: Idle (3D Heart) */}
                {isIdle && (
                    <motion.div
                        key="idle-heart"
                        initial={{ scale: 0, opacity: 0, rotateY: 0 }}
                        animate={{
                            scale: 1.5,
                            opacity: 1,
                            rotateY: 360
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                            rotateY: { repeat: Infinity, duration: 2, ease: "linear" },
                            scale: { duration: 0.5 }
                        }}
                        className="text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]"
                    >
                        <HeartIcon size={32} />
                    </motion.div>
                )}

            </AnimatePresence>

            {/* State 3: Long Idle Text "Y'Ass" */}
            <AnimatePresence>
                {isLongIdle && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 40 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap"
                    >
                        <span className="text-xl font-bold text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm font-handwriting border border-pink-500/30">
                            Y'Ass ❤️
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}

// Simple Heart Icon Component for reusability w/o Lucid dependency inside animation loop for perf if needed, 
// strictly creating valid SVG here.
function HeartIcon({ size = 24, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            className={className}
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    );
}
