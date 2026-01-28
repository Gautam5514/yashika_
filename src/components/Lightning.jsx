"use client";

import React, { useRef, useEffect } from 'react';

export default function Lightning({
    hue = 260,
    xOffset = 0,
    speed = 1,
    intensity = 1,
    size = 1,
    className = "",
    style = {}
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let animationId;

        // Lightning bolt state
        let bolts = [];

        const resize = () => {
            width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
            height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        resize();
        window.addEventListener('resize', resize);

        class Bolt {
            constructor() {
                this.init();
            }

            init() {
                this.life = 0;
                this.ttl = Math.random() * 10 + 20; // Time to live
                this.x = Math.random() * width + xOffset;
                this.y = 0;
                this.segments = [];
                this.generate();
            }

            generate() {
                let currX = this.x;
                let currY = this.y;

                while (currY < height) {
                    const length = Math.random() * 20 * size + 10;
                    const angle = (Math.PI / 2) + (Math.random() - 0.5) * 1.5; // Mostly downwards

                    const nextX = currX + Math.cos(angle) * length;
                    const nextY = currY + Math.sin(angle) * length;

                    this.segments.push({ x1: currX, y1: currY, x2: nextX, y2: nextY });

                    currX = nextX;
                    currY = nextY;

                    // Simple branching logic could go here
                }
            }

            draw(ctx) {
                const alpha = 1 - (this.life / this.ttl);
                const color = `hsla(${hue}, 80%, 70%, ${alpha * intensity})`;

                ctx.strokeStyle = color;
                ctx.lineWidth = 2 * size;
                ctx.shadowBlur = 10 * size;
                ctx.shadowColor = `hsla(${hue}, 100%, 50%, ${alpha})`;
                ctx.lineCap = 'round';
                ctx.beginPath();

                for (let seg of this.segments) {
                    ctx.moveTo(seg.x1, seg.y1);
                    ctx.lineTo(seg.x2, seg.y2);
                }

                ctx.stroke();
            }

            update() {
                this.life += speed;
                return this.life < this.ttl;
            }
        }

        let timeToNextBolt = 0;

        const loop = () => {
            ctx.clearRect(0, 0, width, height);
            // Optional: minimal fake background clear for trails if desired
            // ctx.fillStyle = 'rgba(0,0,0,0.1)';
            // ctx.fillRect(0,0,width,height);

            // Spawn new bolts
            if (timeToNextBolt <= 0) {
                // More intensity = more freq
                if (Math.random() < 0.05 * intensity) {
                    bolts.push(new Bolt());
                    timeToNextBolt = Math.random() * 60 / speed;
                }
            } else {
                timeToNextBolt--;
            }

            // Update and draw bolts
            bolts = bolts.filter(bolt => {
                const alive = bolt.update();
                if (alive) bolt.draw(ctx);
                return alive;
            });

            animationId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [hue, xOffset, speed, intensity, size]);

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none absolute top-0 left-0 w-full h-full ${className}`}
            style={style}
        />
    );
}
