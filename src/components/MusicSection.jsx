"use client";

import { motion } from "framer-motion";
import { Music, Disc3 } from "lucide-react";

export default function MusicSection() {
    return (
        <section className="py-24 px-6 flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse-slow" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-xl w-full relative z-10"
            >
                <div className="flex items-center justify-center gap-3 mb-6">
                    <Disc3 className="w-6 h-6 text-pink-500 animate-spin-slow" />
                    <h2 className="text-3xl md:text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                        Our Melody
                    </h2>
                    <Disc3 className="w-6 h-6 text-purple-500 animate-spin-slow" />
                </div>

                <p className="text-white/60 mb-10 font-light tracking-wide font-serif italic">
                    "Every love story has a soundtrack. <br /> This one is ours."
                </p>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="w-full shadow-[0_0_30px_rgba(236,72,153,0.3)] rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    {/* Raataan Lambiyan - Shershaah */}
                    <iframe
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/track/2rOnSn2piaqLAlYjtfUBlY?utm_source=generator&theme=0"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </motion.div>

                <div className="mt-6 text-xs text-white/20 tracking-[0.2em] font-light uppercase">
                    Listen with your heart
                </div>
            </motion.div>
        </section>
    );
}
