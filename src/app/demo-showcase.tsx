"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import { VerdantCanvas } from "./verdant-canvas";

const SLIDES = [
  {
    image: "/images/demo/01-splash-fridge.png",
    label: "Welcome to your kitchen",
    sublabel: "Scan your fridge. Build your pantry.",
  },
  {
    image: "/images/demo/02-recipe-gen-card.png",
    label: "AI-powered recipes",
    sublabel: "Three modes. Infinite possibilities.",
  },
  {
    image: "/images/demo/03-assistant-feed-store.png",
    label: "Cook, discover, shop",
    sublabel: "Live assistant. Creator feed. Smart store.",
  },
  {
    image: "/images/demo/04-creator-profile.png",
    label: "Cook like a creator",
    sublabel: "Follow chefs. Learn their Flavor DNA.",
  },
  {
    image: "/images/demo/05-mealplan-scanner.png",
    label: "Plan & scan",
    sublabel: "Weekly meals. Snap to add ingredients.",
  },
];

export function DemoShowcase() {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setCurrent(index);
    },
    [current]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Outer glow */}
        <div className="absolute -inset-12 rounded-[48px] bg-brand/8 blur-[80px]" />

        {/* Main container */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.06] shadow-2xl">
          {/* Living generative background — static gradient fallback for reduced motion */}
          <div className="absolute inset-0">
            {shouldReduceMotion ? (
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0d1f14] to-[#0a0a0a]" />
            ) : (
              <VerdantCanvas className="absolute inset-0" />
            )}
          </div>

          {/* Content */}
          <div className="relative px-4 pt-6 pb-4 sm:px-8 sm:pt-10 sm:pb-6">
            {/* Image area */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px]">
              <AnimatePresence mode="wait">
                <m.div
                  key={current}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: shouldReduceMotion ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SLIDES[current].image}
                    alt={SLIDES[current].label}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority={current === 0}
                  />
                </m.div>
              </AnimatePresence>
            </div>

            {/* Label */}
            <div className="mt-5 text-center">
              <AnimatePresence mode="wait">
                <m.div
                  key={current}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: shouldReduceMotion ? 0.15 : 0.4, ease: "easeOut" }}
                >
                  <p className="font-display text-xl italic text-white/90 sm:text-2xl">
                    {SLIDES[current].label}
                  </p>
                  <p className="mt-1 text-sm text-white/40 sm:text-base">
                    {SLIDES[current].sublabel}
                  </p>
                </m.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="mt-4 flex items-center justify-center gap-2 pb-1">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-2 cursor-pointer"
                  style={{ width: i === current ? 24 : 8 }}
                >
                  <m.span
                    className="absolute inset-0 rounded-full"
                    animate={{
                      backgroundColor:
                        i === current
                          ? "#1a9e5f"
                          : "rgba(255,255,255,0.2)",
                      width: i === current ? 24 : 8,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
