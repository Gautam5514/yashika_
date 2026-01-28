"use client";

import React from 'react';

export default function GlitchOverlay() {
    return (
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden mix-blend-overlay opacity-30 select-none">
            {/* Noise Layer */}
            <div className="absolute inset-0 w-full h-full animate-noise opacity-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            {/* Glitch Bars */}
            <div className="absolute inset-0 w-full h-full animate-glitch-1 opacity-20 bg-gradient-to-b from-transparent via-white/10 to-transparent" style={{ backgroundSize: '100% 3px' }} />
            <div className="absolute inset-0 w-full h-full animate-glitch-2 opacity-20 bg-gradient-to-b from-transparent via-white/5 to-transparent" style={{ backgroundSize: '100% 15px' }} />

            <style jsx>{`
                @keyframes noise {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -5%); }
                    20% { transform: translate(-10%, 5%); }
                    30% { transform: translate(5%, -10%); }
                    40% { transform: translate(-5%, 15%); }
                    50% { transform: translate(-10%, 5%); }
                    60% { transform: translate(15%, 0); }
                    70% { transform: translate(0, 10%); }
                    80% { transform: translate(-15%, 0); }
                    90% { transform: translate(10%, 5%); }
                }
                .animate-noise {
                    animation: noise 0.5s steps(10) infinite both;
                }
                
                @keyframes glitch-anim-1 {
                    0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
                    20% { clip-path: inset(92% 0 1% 0); transform: translate(1px, -1px); }
                    40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px, 2px); }
                    60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, 1px); }
                    80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, -1px); }
                    100% { clip-path: inset(58% 0 43% 0); transform: translate(2px, -2px); }
                }
                .animate-glitch-1 {
                    animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
                }

                 @keyframes glitch-anim-2 {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(2px, -2px); }
                    20% { clip-path: inset(60% 0 10% 0); transform: translate(-1px, 1px); }
                    40% { clip-path: inset(40% 0 50% 0); transform: translate(1px, -2px); }
                    60% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 1px); }
                    80% { clip-path: inset(10% 0 70% 0); transform: translate(2px, 2px); }
                    100% { clip-path: inset(30% 0 60% 0); transform: translate(-1px, -1px); }
                }
                .animate-glitch-2 {
                    animation: glitch-anim-2 3s infinite linear alternate-reverse;
                }

                @keyframes glitch-rgb {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }
                .animate-glitch-rgb {
                    animation: glitch-rgb 0.5s infinite steps(2);
                }
            `}</style>
        </div>
    );
}
