"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Ensure you have lucide-react installed

const memories = [
    { id: 1, src: "/home1.jpg", title: "Forever Smile", point: "Distance fades when your smile is here." },
    { id: 2, src: "/home2.jpg", title: "Home in You", point: "The safest place is your presence." },
    { id: 3, src: "/home3.jpg", title: "Golden Minute", point: "Every moment with you feels rare." },
    { id: 4, src: "/home4.jpg", title: "Next Chapter", point: "Adventures look better with your hand." },
    { id: 5, src: "/home5.jpg", title: "Best Thing", point: "You’re the softest highlight of my life." },
    { id: 6, src: "/10.jpeg", title: "Pure Joy", point: "Your laugh is my favorite soundtrack." },
    { id: 7, src: "/11.jpeg", title: "Sweet Day", point: "Ordinary turns magical with you." },
    { id: 8, src: "/12.jpeg", title: "Future Light", point: "I see forever in your eyes." },
];

export default function MemoriesGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // --- Logic to handle navigation ---
    const handleNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1 === memories.length ? 0 : prev + 1));
    }, []);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 < 0 ? memories.length - 1 : prev - 1));
    }, []);

    // --- Keyboard Navigation Support ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev]);

    // --- Animation Variants ---
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
            rotateY: direction > 0 ? 15 : -15, // Subtle 3D rotation
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // "Expo" ease for premium feel
            },
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
            rotateY: direction < 0 ? 15 : -15,
            transition: { duration: 0.5, ease: "easeInOut" },
        }),
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { delay: 0.3, duration: 0.6 } // Delays text until image settles
        }
    };

    return (
        <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col justify-center items-center">
            
            {/* --- 1. Ambient Background Layers --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Grain Texture */}
                <div className="absolute inset-0 opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                
                {/* Gradient Blobs */}
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-rose-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full blur-[120px]" />
            </div>

            {/* --- 2. Main Content Area --- */}
            <div className="relative w-full max-w-6xl px-4 md:px-12 flex flex-col md:flex-row items-center justify-center h-full z-10 gap-8 md:gap-16">
                
                {/* LEFT: Text Content (Desktop) */}
                <div className="hidden md:flex flex-col justify-center w-1/3 order-2 md:order-1 text-left">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentIndex}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={textVariants}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-white/40 font-mono text-sm tracking-widest">
                                    MEM {String(memories[currentIndex].id).padStart(2, '0')}
                                </span>
                                <div className="h-[1px] w-12 bg-white/20"></div>
                            </div>
                            
                            <h2 className="text-5xl lg:text-7xl font-serif text-white leading-[1.1] mb-6">
                                {memories[currentIndex].title}
                            </h2>
                            
                            <p className="text-white/60 text-lg font-light leading-relaxed max-w-sm">
                                {memories[currentIndex].point}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* MIDDLE: The Image Slider */}
                <div className="relative w-full md:w-[500px] h-[50vh] md:h-[65vh] perspective-1000 order-1 md:order-2 flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute w-full h-full rounded-[20px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10"
                        >
                            {/* Image */}
                            <Image
                                src={memories[currentIndex].src}
                                alt={memories[currentIndex].title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 500px"
                            />
                            
                            {/* Overlay Gradient (For text readability on mobile) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:hidden" />

                            {/* Mobile Text Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:hidden">
                                <motion.h2 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-3xl font-serif text-white mb-2"
                                >
                                    {memories[currentIndex].title}
                                </motion.h2>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-white/70 text-sm"
                                >
                                    {memories[currentIndex].point}
                                </motion.p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* --- 3. Controls & Progress --- */}
            <div className="absolute bottom-12 w-full px-8 md:px-24 flex items-center justify-between z-20">
                
                {/* Progress Bar */}
                <div className="flex-1 max-w-xs mr-8 hidden md:block">
                    <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                        <motion.div 
                            className="h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((currentIndex + 1) / memories.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-white/30 tracking-widest uppercase font-sans">
                        <span>Start</span>
                        <span>End</span>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4 mx-auto md:mx-0">
                    <button 
                        onClick={handlePrev}
                        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/30 backdrop-blur-sm active:scale-95"
                    >
                        <ChevronLeft className="w-6 h-6 text-white opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                    
                    <button 
                        onClick={handleNext}
                        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/30 backdrop-blur-sm active:scale-95"
                    >
                        <ChevronRight className="w-6 h-6 text-white opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>
            </div>

        </section>
    );
}