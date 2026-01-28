"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const memories = [
    {
        id: 1,
        src: "/1.png",
        caption: "Our Smile makes distance feel smaller.",
    },
    {
        id: 2,
        src: "/2.jpg",
        caption: "Some people feel like home, even from miles away.",
    },
    {
        id: 3,
        src: "/3.jpg",
        caption: "Every moment with you is a favorite memory.",
    },
    {
        id: 4,
        src: "/4.png",
        caption: "Can’t wait for our next adventure together.",
    },
    {
        id: 5,
        src: "/5.jpg",
        caption: "You are the best thing that ever happened to me.",
    },
];

const BloodDrops = () => {
    // Generate static drops for performance
    const drops = Array.from({ length: 20 });

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {drops.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: ["0vh", "100vh"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2, // 2-5s fall
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        width: Math.random() > 0.5 ? '2px' : '3px',
                        height: Math.random() * 10 + 10 + 'px',
                    }}
                    className="absolute top-0 bg-red-600/60 rounded-full blur-[1px]"
                />
            ))}
        </div>
    );
};

export default function MemoriesSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % memories.length);
        }, 4000); // 4 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">

            {/* Blood Color Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a0a0a] via-[#4a0404] to-[#1a0000] z-0" />

            {/* Blood Drops Effect */}
            <BloodDrops />

            {/* Content Content - Simple & Clean */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl md:text-6xl font-handwriting text-red-100/90 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                        In My Veins
                    </h2>
                    <p className="text-red-200/50 text-sm tracking-[0.3em] uppercase mt-2 font-light">
                        Eternal Moments
                    </p>
                </motion.div>

                {/* Single Elegant Image Display */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[600px] rounded-sm bg-black/20 shadow-[0_0_60px_rgba(153,27,27,0.3)] border border-red-900/30 backdrop-blur-sm p-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="relative w-full h-full overflow-hidden rounded-sm"
                        >
                            <Image
                                src={memories[currentIndex].src}
                                alt={memories[currentIndex].caption}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Subtle dark gradient overlay for text readability */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

                            {/* Simple Caption */}
                            <div className="absolute bottom-6 left-0 w-full text-center px-6">
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="text-xl md:text-3xl text-white/90 font-serif italic tracking-wide drop-shadow-lg"
                                >
                                    "{memories[currentIndex].caption}"
                                </motion.p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Minimal Progress Bar */}
                <div className="flex gap-2 mt-8">
                    {memories.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 transition-all duration-700 rounded-full ${idx === currentIndex
                                    ? "w-12 bg-red-500 shadow-[0_0_10px_#ef4444]"
                                    : "w-2 bg-red-900/40"
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
