import React, { useRef, useId } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

function BeeGraphic({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      <defs>
        <ellipse id={`bee-body-${idPrefix}`} cx="20" cy="18" rx="14" ry="10" transform="rotate(15, 20, 18)" />
        <clipPath id={`body-clip-${idPrefix}`}>
          <use href={`#bee-body-${idPrefix}`} />
        </clipPath>
      </defs>

      {/* Stinger */}
      <path d="M 30 22 L 38 26 L 31 28 Z" fill="#1f2937" stroke="#1f2937" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Legs */}
      <path d="M 21 27 L 19 31 M 26 26 L 24 30" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />

      {/* Back Wing */}
      <ellipse cx="28" cy="8" rx="5" ry="8" transform="rotate(45, 28, 8)" fill="#F8FAFC" stroke="#1f2937" strokeWidth="2.5" />

      {/* Body Fill */}
      <use href={`#bee-body-${idPrefix}`} fill="#FBBF24" />

      {/* Stripes */}
      <g clipPath={`url(#body-clip-${idPrefix})`}>
        <path d="M 20 4 L 14 34" stroke="#1f2937" strokeWidth="5.5" />
        <path d="M 29 8 L 23 38" stroke="#1f2937" strokeWidth="5.5" />
      </g>

      {/* Body Outline */}
      <use href={`#bee-body-${idPrefix}`} fill="none" stroke="#1f2937" strokeWidth="3" />

      {/* Eye */}
      <circle cx="11" cy="14" r="2" fill="#1f2937" />

      {/* Front Wing */}
      <ellipse cx="18" cy="6" rx="5" ry="8" transform="rotate(20, 18, 6)" fill="#F8FAFC" stroke="#1f2937" strokeWidth="2.5" />
    </>
  );
}

export default function Divider({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idStr = useId();
  // Safe ID without colons for SVG mask
  const maskId = `trail-mask-${idStr.replace(/:/g, '')}`;
  const maskIdMobile = `trail-mask-mobile-${idStr.replace(/:/g, '')}`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "end 20%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 15,
    restDelta: 0.001
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);
  const offsetDistance = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const desktopPath = "M 1000 40 C 930 40 830 70 730 80 C 650 90 630 20 680 20 C 730 20 730 70 680 60 C 580 40 480 30 360 70 C 270 100 230 70 260 40 C 310 0 410 60 320 60 Q 260 80 220 60 Q 180 40 50 40";
  const mobilePath = "M 400 40 Q 320 20 200 40 T 20 40";

  return (
    <div ref={containerRef} className={`w-full max-w-7xl mx-auto px-6 py-6 md:py-10 overflow-hidden flex flex-col items-center relative ${className}`}>
      {/* Desktop SVG */}
      <svg 
        viewBox="0 0 1000 120" 
        className={`hidden md:block w-full max-w-[1000px] h-auto object-contain ${flip ? '-scale-x-100' : ''}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id={maskId}>
            <motion.path 
              d={desktopPath}
              stroke="white"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
            />
          </mask>
        </defs>

        {/* Dashed trail */}
        <path 
           d={desktopPath}
          stroke="#1f2937" 
          strokeWidth="4" 
          strokeDasharray="8 12" 
          strokeLinecap="round"
          mask={`url(#${maskId})`}
        />
        
        {/* Hand-drawn Bee Replica */}
        <motion.g 
          style={{
            offsetPath: `path("${desktopPath}")`,
            offsetDistance,
            offsetRotate: "0deg"
          }}
        >
          <motion.g 
            transform="scale(1.2) translate(-20, -25)"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BeeGraphic idPrefix={`${idStr}-desktop`} />
          </motion.g>
        </motion.g>
      </svg>

      {/* Mobile SVG */}
      <svg 
        viewBox="0 0 400 80" 
        className={`block md:hidden w-full h-auto object-contain ${flip ? '-scale-x-100' : ''}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id={maskIdMobile}>
            <motion.path 
              d={mobilePath}
              stroke="white"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
            />
          </mask>
        </defs>

        {/* Dashed trail */}
        <path 
          d={mobilePath}
          stroke="#1f2937" 
          strokeWidth="4" 
          strokeDasharray="8 12" 
          strokeLinecap="round"
          mask={`url(#${maskIdMobile})`}
        />
        
        {/* Hand-drawn Bee Replica */}
        <motion.g 
          style={{
            offsetPath: `path("${mobilePath}")`,
            offsetDistance,
            offsetRotate: "0deg"
          }}
        >
          <motion.g 
            transform="scale(1) translate(-20, -25)"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BeeGraphic idPrefix={`${idStr}-mobile`} />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
