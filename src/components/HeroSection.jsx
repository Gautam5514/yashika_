"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
    const images = [
        "/1.png",
        "/2.jpg",
        "/3.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background text-foreground px-4">
            {/* Background Slider */}
            <div className="absolute inset-0 w-full h-full z-0">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt="Background Memory"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* Background Decor (Optional - kept subtle behind text/overlay if needed, or removed) */}
            {/* Keeping it simple as per request for "full display" of images, but adding slight z-index handling */}

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-center z-10 relative"
            >
                <motion.h1
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="text-6xl md:text-8xl font-handwriting text-primary mb-6 drop-shadow-lg shadow-black/20"
                >
                    Hey Yass Babes ❤️
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 1.5 }}
                    className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed font-sans drop-shadow-md"
                >
                    Today isn’t just your birthday,<br />
                    it’s the day the world became more beautiful.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-10 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-8 h-8 text-white/70" />
                </motion.div>
            </motion.div>
        </section>
    );
}
