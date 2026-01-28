"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Stars, Send } from "lucide-react";
import TargetCursor from "./TargetCursor";

export default function FinalSection() {
    return (
        <section className="h-screen flex flex-col items-center justify-center bg-[#050505] text-center px-6 relative overflow-hidden selection:bg-purple-500/30">
            <TargetCursor
                spinDuration={5} // Slower comfortable spin
                hideDefaultCursor
                parallaxOn
                hoverDuration={0.15}
            />

            {/* Elegant Background - Stars & Nebulas */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-1000" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="max-w-5xl z-10 relative flex flex-col items-center gap-10"
            >
                {/* Quote Section - Snappy Box Target */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative p-8 border border-white/5 rounded-2xl bg-white/0 backdrop-blur-[2px] cursor-target group transition-colors duration-500 hover:bg-white/5 hover:border-white/10"
                >
                    <blockquote className="text-xl md:text-3xl font-light text-white/80 font-serif italic leading-relaxed tracking-wide">
                        "Distance is just a test to see <br className="hidden md:block" />
                        <span className="text-white font-medium not-italic">how far love can travel.</span>"
                    </blockquote>
                </motion.div>

                {/* Central Heart */}
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        filter: ["drop-shadow(0 0 15px rgba(220, 38, 38, 0.4))", "drop-shadow(0 0 30px rgba(220, 38, 38, 0.7))", "drop-shadow(0 0 15px rgba(220, 38, 38, 0.4))"]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="cursor-target p-4 rounded-full"
                >
                    <Heart className="w-24 h-24 text-red-500 fill-red-500/80" />
                </motion.div>

                {/* Main Heading - Split targets for better cursor effect */}
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-4xl md:text-6xl font-handwriting text-white/90 drop-shadow-2xl cursor-target px-6 py-2">
                        Happy Birthday,
                    </h1>
                    <h1 className="text-5xl md:text-8xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-white to-purple-400 drop-shadow-[0_0_35px_rgba(255,255,255,0.2)] cursor-target px-6 py-2">
                        Gautam <span className="text-red-500 inline-block animate-bounce-slow">❤️</span>
                    </h1>
                </div>

                {/* Button - Target with Text */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-12 py-4 border border-white/20 rounded-full text-white/70 font-light tracking-[0.25em] text-sm hover:text-white hover:border-white/60 hover:bg-white/5 transition-all duration-300 cursor-target flex items-center gap-3 backdrop-blur-sm"
                >
                    <Send className="w-4 h-4" />
                    <span>SENDING LOVE</span>
                </motion.button>

            </motion.div>

            <div className="absolute bottom-8 text-[10px] text-white/20 font-light tracking-[0.5em] uppercase">
                Made with Love • 2024
            </div>
        </section>
    );
}
