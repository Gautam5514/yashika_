"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero3DCarousel() {
    const images = [
        "/1.png",
        "/2.jpg",
        "/3.jpg",
        "/1.png",
        "/2.jpg",
        "/3.jpg",
        "/1.png",
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const rotation = useMotionValue(0);

    // Auto-rotate
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0d0d0d] text-white perspective-1000">

            {/* Dynamic Background */}
            <div className="absolute inset-0 opacity-30 select-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-[#0d0d0d]" />
                <motion.img
                    key={activeIndex}
                    src={images[activeIndex]}
                    initial={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                    animate={{ opacity: 0.4, scale: 1.1, filter: "blur(10px)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* 3D Carousel Container */}
            <div className="relative w-full h-[60vh] flex items-center justify-center z-10 perspective-[1200px] transform-style-3d">
                {images.map((img, index) => {
                    // Determine relative position to active index
                    // We want a circular buffer effect conceptually, but for now simple linear distance
                    let offset = index - activeIndex;

                    // Handle wrapping for infinite loop feel (simplified for this demo)
                    // If the array is huge, we'd need virtual windowing. 
                    // For 7 images, let's just keep it simple or implement a true circular distance.

                    // True circular distance for visual placement
                    const count = images.length;
                    if (Math.abs(offset) > count / 2) {
                        offset = offset > 0 ? offset - count : offset + count;
                    }

                    const isActive = offset === 0;

                    return (
                        <motion.div
                            key={index}
                            className={`absolute rounded-2xl shadow-2xl overflow-hidden border-2 ${isActive ? 'border-purple-500/50 z-30' : 'border-transparent z-10'}`}
                            initial={false}
                            animate={{
                                rotateY: offset * 40, // Rotate based on offset
                                rotateX: isActive ? 0 : 5, // Slight tilt for non-active
                                x: offset * 260, // Spread them out
                                z: Math.abs(offset) * -300, // Push back non-active
                                scale: isActive ? 1.2 : 0.8,
                                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3,
                                filter: isActive ? "brightness(1.1)" : "brightness(0.6) blur(2px)",
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.32, 0.72, 0, 1], // Custom spring-like easing
                            }}
                            style={{
                                width: "280px", // Base size
                                height: "400px",
                                transformOrigin: "center center",
                            }}
                            onClick={() => setActiveIndex(index)}
                        >
                            <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover select-none pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        </motion.div>
                    );
                })}
            </div>

            {/* Hero Text Overlay */}
            <div className="absolute z-40 top-1/4 left-1/2 -translate-x-1/2 text-center pointer-events-none w-full px-4">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] font-handwriting"
                    style={{ fontFamily: 'Satisfy, cursive' }} // Ensure we have a handwriting font or fallback
                >
                    Hey Yass Babes ❤️
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-4 text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto"
                >
                    The world got a little brighter today...
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 z-20 text-white/50"
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
}
