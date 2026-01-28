"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const SLIDES = [
    {
        id: 1,
        image: "/1.png",
        title: "Radiant",
        subtitle: "Beauty that shines",
        description: "Every smile of yours lights up the world around you.",
        color: "#e0a6b7" // Rose
    },
    {
        id: 2,
        image: "/2.jpg",
        title: "Timeless",
        subtitle: "Grace in every moment",
        description: "Capturing memories that will last a lifetime.",
        color: "#b5ebd6" // Mint
    },
    {
        id: 3,
        image: "/3.jpg",
        title: "Ethereal",
        subtitle: "A dream come true",
        description: "You are the magic that makes life beautiful.",
        color: "#ffd1dc" // Pastel Pink
    }
];

export default function HeroPremiumSlider() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setIndex((prev) => (prev + newDirection + SLIDES.length) % SLIDES.length);
    };

    useEffect(() => {
        const timer = setInterval(() => paginate(1), 6000);
        return () => clearInterval(timer);
    }, []);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.2,
            rotateY: direction > 0 ? 45 : -45,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45,
        }),
    };

    const textVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const currentSlide = SLIDES[index];

    return (
        <section className="relative h-screen w-full overflow-hidden bg-background text-foreground perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={index}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 },
                        rotateY: { duration: 0.8 }
                    }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center transform-style-3d cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -10000) {
                            paginate(1);
                        } else if (swipe > 10000) {
                            paginate(-1);
                        }
                    }}
                >
                    {/* Background Image / Card */}
                    <div className="relative w-full h-full md:w-[90%] md:h-[90%] overflow-hidden bg-black md:rounded-3xl shadow-2xl">
                        <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20">
                            <motion.p
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-lg md:text-xl uppercase tracking-[0.3em] text-white/80 mb-4 font-sans"
                            >
                                {currentSlide.subtitle}
                            </motion.p>

                            <motion.h1
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="text-7xl md:text-9xl font-handwriting text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] mb-6"
                                style={{ color: currentSlide.color }}
                            >
                                {currentSlide.title}
                            </motion.h1>

                            <motion.p
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="max-w-md text-white/70 text-lg md:text-xl font-light leading-relaxed"
                            >
                                {currentSlide.description}
                            </motion.p>
                        </div>
                    </div>

                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 left-12 z-30 flex gap-4">
                <button
                    className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all border border-white/10"
                    onClick={() => paginate(-1)}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all border border-white/10"
                    onClick={() => paginate(1)}
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-12 right-12 z-30 flex gap-3 text-white/50 font-mono text-sm">
                {SLIDES.map((slide, i) => (
                    <div
                        key={slide.id}
                        className={`flex flex-col items-center gap-1 transition-all duration-300 ${i === index ? 'text-white' : ''}`}
                    >
                        <div className={`h-12 w-0.5 bg-current transition-all duration-500 ${i === index ? 'bg-white h-16' : 'bg-white/20'}`} />
                        <span>0{i + 1}</span>
                    </div>
                ))}
            </div>

        </section>
    );
}

const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};
