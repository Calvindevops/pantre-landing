"use client";

import dynamic from "next/dynamic";

// Client wrapper for dynamic import — ssr:false requires a Client Component in Next.js 16
const DemoShowcase = dynamic(
  () => import("./demo-showcase").then((mod) => mod.DemoShowcase),
  {
    ssr: false,
    loading: () => (
      <div className="relative mx-auto w-full max-w-4xl aspect-[16/10] rounded-[24px] bg-[#0a0a0a]" />
    ),
  }
);

export function DemoShowcaseLoader() {
  return <DemoShowcase />;
}
