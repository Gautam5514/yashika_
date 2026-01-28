"use client";

import { motion } from "framer-motion";
import DomeGallery from "./DomeGallery";

const pictures = [
    { src: '/home1.jpg', alt: 'Memory 1' },
    { src: '/home2.jpg', alt: 'Memory 2' },
    { src: '/home3.jpg', alt: 'Memory 3' },
    { src: '/home4.jpg', alt: 'Memory 4' },
    { src: '/11.jpeg', alt: 'Memory 10' },
    { src: '/home5.jpg', alt: 'Memory 5' },
    { src: '/2.jpg', alt: 'Memory 6' },
    { src: '/5.jpg', alt: 'Memory 7' },
    { src: '/6.jpg', alt: 'Memory 8' },
    { src: '/10.jpeg', alt: 'Memory 9' },
    
    { src: '/12.jpeg', alt: 'Memory 11' },
    { src: '/13.jpeg', alt: 'Memory 12' },
    { src: '/14.jpeg', alt: 'Memory 13' },
    { src: '/15.jpeg', alt: 'Memory 14' },
    { src: '/16.jpeg', alt: 'Memory 15' },
    // Duplicate to fill space if needed
    { src: '/home1.jpg', alt: 'Memory 1' },
    { src: '/home2.jpg', alt: 'Memory 2' },
    { src: '/home3.jpg', alt: 'Memory 3' },
    { src: '/home4.jpg', alt: 'Memory 4' },
    { src: '/home5.jpg', alt: 'Memory 5' },
];

export default function MemoryGallerySection() {
    return (
        <section className="h-screen w-full bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center">

            <div className="absolute top-10 z-20 text-center pointer-events-none">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-purple-300 drop-shadow-md"
                >
                    A Universe of Memories
                </motion.h2>
                <p className="text-white/40 text-sm mt-2 font-light tracking-widest uppercase">
                    Drag to explore our world
                </p>
            </div>

            <div className="w-full h-full relative z-10">
                <DomeGallery
                    images={pictures}
                    fit={0.85}
                    minRadius={500}
                    maxVerticalRotationDeg={25} // Allow some vertical tilt
                    segments={20} // Adjusted for better density
                    dragDampening={0.8}
                    overlayBlurColor="#050505"
                    grayscale={false} // Keep colorful memories
                />
            </div>
        </section>
    );
}
