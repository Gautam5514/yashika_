"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Quote, Feather } from "lucide-react";
import { useRef } from "react";

export default function LetterSection() {
    const ref = useRef(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="py-24 px-6 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#881337_0%,_#000000_100%)] relative overflow-hidden perspective-1000">

            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-amber-200 drop-shadow-[0_0_20px_rgba(252,211,77,0.3)]">
                        Words from the Heart
                    </h2>
                </motion.div>

                {/* 3D Tilting Letter Card */}
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-full max-w-lg aspect-[3/4] cursor-grab active:cursor-grabbing"
                >
                    <div
                        style={{ transform: "translateZ(75px)" }}
                        className="absolute inset-0 bg-[#fdfbf7] rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[8px] border-double border-amber-900/20 p-8 flex flex-col items-center overflow-hidden"
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none mix-blend-multiply" />

                        {/* Wax Seal Visual */}
                        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-red-800 shadow-inner flex items-center justify-center border-2 border-red-900/50 opacity-80">
                            <Feather className="w-6 h-6 text-red-950/50" />
                        </div>

                        {/* Content Area */}
                        <div className="relative w-full h-full flex items-center justify-center border border-dashed border-gray-300 bg-gray-50/50 mt-12 mb-4">
                            <p className="text-gray-400 font-serif italic text-sm text-center px-4">
                                (Upload your handwritten letter here)
                            </p>
                            {/* <Image src="/path/to/letter.jpg" fill className="object-cover" alt="My Letter" /> */}
                        </div>

                        <div className="w-full text-right mt-2">
                            <span className="font-handwriting text-2xl text-gray-800 opacity-70">~ With Love</span>
                        </div>
                    </div>
                </motion.div>

                {/* Sparkling Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 max-w-xl text-center relative"
                >
                    <Quote className="w-8 h-8 text-yellow-500/50 absolute -top-6 -left-4 -scale-x-100" />
                    <p className="text-xl md:text-2xl font-light text-white/70 font-serif italic leading-relaxed tracking-wide">
                        "I wrote this with my hands, but every word came from my <span className="text-yellow-200">heart</span>."
                    </p>
                    <Quote className="w-8 h-8 text-yellow-500/50 absolute -bottom-4 -right-4" />
                </motion.div>
            </div>
        </section>
    );
}
