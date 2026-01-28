"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronRight, ChevronLeft, MousePointer2, Sparkles, ChevronDown } from "lucide-react";

// Slide Data
const SLIDES = [
    {
        id: 1,
        image: "/1.png",
        title: "Glorious",
        subtitle: "Unmatched Beauty",
        description: "Step into a world where elegance meets infinity. You are the masterpiece.",
        color: "#FFD700", // Gold
        accent: "#FFA500"
    },
    {
        id: 2,
        image: "/2.jpg",
        title: "Ethereal",
        subtitle: "Beyond Dreams",
        description: "Floating through moments of pure magic and timeless grace.",
        color: "#E0FFFF", // Light Cyan
        accent: "#00FFFF"
    },
    {
        id: 3,
        image: "/3.jpg",
        title: "Radiant",
        subtitle: "Shine Bright",
        description: "Your glow illuminates the darkness, creating a path of light.",
        color: "#FF69B4", // Hot Pink
        accent: "#FF1493"
    },
    {
        id: 4,
        image: "/6.png",
        title: "Majestic",
        subtitle: "Royal Presence",
        description: "Commanding attention with every glance, every smile, every move.",
        color: "#9370DB", // Medium Purple
        accent: "#8A2BE2"
    }
];

export default function HeroGlorious() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef(null);

    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse spring
    const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    // Separate springs for pixel-based cursor movement
    const cursorX = useMotionValue(-100); // Start off-screen
    const cursorY = useMotionValue(-100);
    const cursorSpringX = useSpring(cursorX, { stiffness: 100, damping: 20 });
    const cursorSpringY = useSpring(cursorY, { stiffness: 100, damping: 20 });

    // Parallax Transforms (keep existing logic for parallax)
    const moveX = useTransform(smoothX, [-1, 1], [30, -30]);
    const moveY = useTransform(smoothY, [-1, 1], [30, -30]);
    const moveTextX = useTransform(smoothX, [-1, 1], [15, -15]);
    const moveTextY = useTransform(smoothY, [-1, 1], [15, -15]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;

            // Update parallax values
            mouseX.set(x);
            mouseY.set(y);

            // Update cursor pixel values
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, cursorX, cursorY]);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 7000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    };

    const currentSlide = SLIDES[currentIndex];

    // Variants for cinematic transitions
    const slideVariants = {
        enter: (direction) => ({
            opacity: 0,
            scale: 1.2,
            filter: "blur(20px)",
            zIndex: 0
        }),
        center: {
            zIndex: 1,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1] // easeOutExpo-ish
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
            }
        }
        )
    };

    const textRevealVariants = {
        hidden: { y: 100, opacity: 0, skewY: 5 },
        visible: (custom) => ({
            y: 0,
            opacity: 1,
            skewY: 0,
            transition: {
                delay: custom * 0.2, // Staggered delay
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
            }
        }),
        exit: {
            y: -50,
            opacity: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-black text-white cursor-none"
        >
            {/* Custom Mouse Follower */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white mix-blend-difference pointer-events-none z-[100] hidden md:flex items-center justify-center"
                style={{
                    x: cursorSpringX,
                    y: cursorSpringY,
                }}
            >
                <div className="w-1 h-1 bg-white rounded-full" />
            </motion.div>

            <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Background Image with Parallax */}
                    <motion.div
                        className="absolute inset-0 w-full h-full"
                        style={{ x: moveX, y: moveY, scale: 1.1 }}
                    >
                        <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id}
                        className="text-center px-4 max-w-5xl mx-auto"
                        style={{ x: moveTextX, y: moveTextY }}
                    >
                        <div className="overflow-hidden">
                            <motion.h3
                                custom={1}
                                variants={textRevealVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="text-xl md:text-2xl uppercase tracking-[0.5em] font-light text-white/80 mb-4"
                            >
                                {currentSlide.subtitle}
                            </motion.h3>
                        </div>

                        <div className="overflow-hidden py-2">
                            <motion.h1
                                custom={2}
                                variants={textRevealVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="text-7xl md:text-[10rem] font-bold leading-[0.9] text-transparent bg-clip-text font-serif"
                                style={{
                                    backgroundImage: `linear-gradient(to bottom, #ffffff, ${currentSlide.color})`,
                                    fontFamily: '"Cinzel", "Playfair Display", serif',
                                    textShadow: `0 0 50px ${currentSlide.accent}40`
                                }}
                            >
                                {currentSlide.title}
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden mt-6">
                            <motion.p
                                custom={3}
                                variants={textRevealVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto italic"
                            >
                                "{currentSlide.description}"
                            </motion.p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-end z-30 pointer-events-auto">

                {/* Progress Lines */}
                <div className="flex gap-4 items-center">
                    {SLIDES.map((slide, idx) => (
                        <div
                            key={slide.id}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className="group cursor-pointer flex flex-col items-center gap-2"
                        >
                            <span className={`text-xs font-mono transition-colors duration-300 ${idx === currentIndex ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>0{idx + 1}</span>
                            <div className="w-[2px] h-10 bg-white/10 group-hover:bg-white/30 transition-colors relative overflow-hidden rounded-full">
                                {idx === currentIndex && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute inset-0 bg-white shadow-[0_0_10px_white]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-6">
                    {/* Prev Button */}
                    <button
                        onClick={prevSlide}
                        className="hidden md:flex items-center gap-4 text-white group hover:scale-105 transition-transform"
                    >
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                            <ChevronLeft size={20} className="text-white" />
                        </div>
                        <span className="uppercase tracking-widest text-sm text-white/60 group-hover:text-white transition-colors">Prev</span>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="hidden md:flex items-center gap-4 text-white group hover:scale-105 transition-transform"
                    >
                        <span className="uppercase tracking-widest text-sm text-white/60 group-hover:text-white transition-colors">Next</span>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                            <ChevronRight size={20} className="text-white" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-30"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <ChevronDown size={20} />
            </motion.div>

            {/* Grain Overlay for texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        </section>
    );
}
