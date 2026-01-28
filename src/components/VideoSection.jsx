"use client";

import { motion } from "framer-motion";
import LaserFlow from "./LaserFlow";

export default function VideoSection() {
    return (
        <section className="h-screen w-full relative overflow-hidden bg-[#050505] flex items-center justify-center">
            {/* Glorious Laser Background */}
            <div className="absolute inset-0 z-0">
                <LaserFlow
                    color="#ec4899" // Pink-500 matching the theme
                    fogIntensity={0.6}
                    flowSpeed={0.5}
                    wispIntensity={0.8}
                />
            </div>

            <div className="max-w-4xl w-full mx-auto text-center relative z-10 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-purple-300 mb-4 drop-shadow-md"
                >
                    A Message From Me to You 🎥
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 mb-12 font-light tracking-wider italic text-lg"
                >
                    Please watch this when you’re calm and smiling ❤️
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.3)] border-2 border-white/10 backdrop-blur-xl group"
                >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

                    {/* Replace 'VIDEO_ID' with your real YouTube video ID */}
                    <iframe
                        className="absolute inset-0 w-full h-full z-20"
                        src="https://youtu.be/0ojX1KObwI4"
                        title="Birthday Message"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </motion.div>

                <div className="mt-8 text-xs text-white/20 tracking-[0.3em] uppercase animate-pulse">
                    Tap to Play
                </div>
            </div>
        </section>
    );
}
