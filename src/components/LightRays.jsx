"use client";

import React, { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Color } from 'ogl';

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uSpread;
uniform float uLength;
uniform float uNoise;
uniform float uDistortion;
uniform float uFade;
uniform bool uFollowMouse;

varying vec2 vUv;

// Psuedo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Noise function
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    
    // Center of rays
    vec2 center = vec2(0.5, 0.0); // Top-center by default
    if (uFollowMouse) {
        center = uMouse;
    }
    
    // Vector from center to current pixel
    vec2 toPixel = uv - center;
    float dist = length(toPixel);
    
    // Angle
    float angle = atan(toPixel.y, toPixel.x);
    
    // Animated noise based on angle and time
    float n = noise(vec2(angle * 10.0 + uDistortion * sin(dist * 10.0 - uTime), uTime * uSpeed));
    
    // Create rays - sharper edge for more definition ("fire" look)
    float ray = smoothstep(0.5 - uSpread, 0.5 + uSpread, n);
    ray = pow(ray, 1.5); // Increase contrast
    
    // Fade out over distance
    float fade = 1.0 - smoothstep(0.0, uLength, dist);
    if(uFade > 0.0) {
        fade *= smoothstep(1.0, 1.0 - uFade, dist); 
    }
    
    // Combine
    float alpha = ray * fade;
    
    // Apply noise texture overlay if requested
    if(uNoise > 0.0) {
        alpha *= mix(1.0, random(uv * uTime), uNoise);
    }
    
    // Boost alpha for intensity
    alpha *= 1.5;

    gl_FragColor = vec4(uColor, alpha);
}
`;

const vertexShader = `
attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export default function LightRays({
    raysOrigin = "top-center",
    raysColor = "#ffffff",
    raysSpeed = 1,
    lightSpread = 0.5,
    rayLength = 3,
    followMouse = true,
    mouseInfluence = 0.1, // Used in parent logic if needed, or uniform
    noiseAmount = 0,
    distortion = 0,
    className = "",
    pulsating = false,
    fadeDistance = 1,
    saturation = 1,
    ...props
}) {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const glRef = useRef(null);
    const programRef = useRef(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: false,
            dpr: Math.min(window.devicePixelRatio, 2)
        });

        glRef.current = renderer.gl;
        container.appendChild(renderer.gl.canvas);
        rendererRef.current = renderer;

        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        const camera = new Camera(gl, { fov: 35 });
        camera.position.set(0, 0, 5);

        const scene = new Transform();

        // Convert hex color to RGB array
        const colorObj = new Color(raysColor);
        const colorVec = [colorObj.r, colorObj.g, colorObj.b];

        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Float32Array([container.offsetWidth, container.offsetHeight]) },
                uMouse: { value: new Float32Array([0.5, 0.0]) }, // Default origin
                uColor: { value: new Float32Array(colorVec) },
                uSpeed: { value: raysSpeed },
                uSpread: { value: lightSpread },
                uLength: { value: rayLength },
                uNoise: { value: noiseAmount },
                uDistortion: { value: distortion },
                uFade: { value: fadeDistance },
                uFollowMouse: { value: followMouse ? 1 : 0 },
            }
        });
        programRef.current = program;

        const geometry = new Plane(gl, { width: 20, height: 20 }); // Large enough to cover
        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);

        // Helper to map origin string to coords
        const getOriginCoords = (origin) => {
            switch (origin) {
                case 'top-center': return [0.5, 0.0];
                case 'center': return [0.5, 0.5];
                // Add more as needed
                default: return [0.5, 0.0];
            }
        };

        if (!followMouse) {
            program.uniforms.uMouse.value = new Float32Array(getOriginCoords(raysOrigin));
        }

        const resize = () => {
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            renderer.setSize(width, height);
            camera.perspective({ aspect: width / height });
            program.uniforms.uResolution.value.set([width, height]);
        };

        window.addEventListener('resize', resize);
        resize();

        // Mouse move handler
        const onMouseMove = (e) => {
            if (!followMouse) return;
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - ((e.clientY - rect.top) / rect.height); // Invert Y for UVs usually
            mouseRef.current = { x, y };
        };

        if (followMouse) {
            window.addEventListener('mousemove', onMouseMove);
        }

        let animationId;
        const update = (t) => {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;

            if (followMouse) {
                // Smooth lerp
                const currentX = program.uniforms.uMouse.value[0];
                const currentY = program.uniforms.uMouse.value[1];
                const targetX = mouseRef.current.x;
                const targetY = mouseRef.current.y;

                const lerpSpeed = mouseInfluence; // Use prop
                const nextX = currentX + (targetX - currentX) * lerpSpeed;
                const nextY = currentY + (targetY - currentY) * lerpSpeed;

                program.uniforms.uMouse.value.set([nextX, nextY]);
            }

            renderer.render({ scene, camera });
        };
        animationId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            if (followMouse) {
                window.removeEventListener('mousemove', onMouseMove);
            }
            cancelAnimationFrame(animationId);
            if (container.contains(gl.canvas)) {
                container.removeChild(gl.canvas);
            }
        };
    }, [raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, distortion]);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full pointer-events-none ${className}`} // Ensure pointer events don't block
            {...props}
        />
    );
}

// Helper Mesh class since we imported only limited set
import { Mesh } from 'ogl';
