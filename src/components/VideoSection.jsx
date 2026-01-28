"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LaserFlow from "./LaserFlow";

const VIDEO_ID = "0ojX1KObwI4";

export default function VideoSection() {
  const [playInline, setPlayInline] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const embedSrc = useMemo(() => {
    // Inline embed — no redirect
    return `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`;
  }, []);

  const embedSrcModal = useMemo(() => {
    // Modal version (autoplay too)
    return `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`;
  }, []);

  const thumb = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;

  return (
    <section className="h-screen w-full relative overflow-hidden bg-[#050505] flex items-center justify-center">
      {/* Glorious Laser Background */}
      <div className="absolute inset-0 z-0">
        <LaserFlow
          color="#ec4899"
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
          {/* If not playing yet, show thumbnail + overlay */}
          {!playInline ? (
            <button
              type="button"
              onClick={() => setPlayInline(true)}
              className="absolute inset-0 w-full h-full"
              aria-label="Play video"
            >
              {/* Thumbnail */}
              <img
                src={thumb}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-[1.04] transition-transform duration-700"
                loading="lazy"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Center play CTA */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative">
                  <div className="absolute -inset-10 rounded-full blur-2xl bg-pink-500/30 opacity-80 group-hover:opacity-100 transition" />
                  <div className="relative flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur-md border border-white/15 shadow-lg">
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-white/15 border border-white/20">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-white translate-x-[1px]"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <div className="text-white text-left">
                      <div className="text-sm font-semibold tracking-wide">
                        Tap to play
                      </div>
                      <div className="text-xs text-white/70">
                        Plays here • No redirect
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Little hint on bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-white/40 tracking-[0.25em] uppercase z-20">
                Inline Player
              </div>
            </button>
          ) : (
            <>
              {/* Embedded video (correct embed URL) */}
              <iframe
                className="absolute inset-0 w-full h-full z-20"
                src={embedSrc}
                title="Birthday Message"
                allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Controls overlay (full screen / close) */}
              <div className="absolute top-3 right-3 z-30 flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="px-3 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs backdrop-blur-md hover:bg-white/15 transition"
                >
                  Full View
                </button>
                <button
                  type="button"
                  onClick={() => setPlayInline(false)}
                  className="px-3 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs backdrop-blur-md hover:bg-white/15 transition"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </motion.div>

        <div className="mt-8 text-xs text-white/20 tracking-[0.3em] uppercase animate-pulse">
          Tap to Play
        </div>
      </div>

      {/* Full view modal (still on same website) */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(236,72,153,0.25)]"
              initial={{ scale: 0.96, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={embedSrcModal}
                title="Birthday Message - Full View"
                allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-3 z-10 px-3 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs backdrop-blur-md hover:bg-white/15 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
