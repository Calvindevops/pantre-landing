import { Suspense } from "react";
import Image from "next/image";
import { WaitlistForm } from "./waitlist-form";
import { AnimatedLogo } from "./animated-logo";
import { DemoShowcaseLoader } from "./demo-showcase-loader";
import {
  RevealSection,
  StaggerGrid,
  StaggerItem,
} from "./scroll-sections";

const FEATURES = [
  {
    image: "/images/hero-fridge.png",
    title: "Scan Your Fridge",
    description:
      "Point your camera at your fridge, receipt, or grocery bag. AI identifies every ingredient instantly.",
  },
  {
    image: "/images/feature-recipes.png",
    title: "AI Recipe Generation",
    description:
      "Get personalized recipes based on what you actually have. No more missing ingredients.",
  },
  {
    image: "/images/feature-assistant.png",
    title: "Live Cooking Assistant",
    description:
      "Step-by-step guidance, real-time substitutions, and voice-powered help while you cook.",
  },
  {
    image: "/images/feature-mealplan.png",
    title: "Smart Meal Planning",
    description:
      "Weekly plans that minimize waste and maximize flavor. Auto-generated grocery lists.",
  },
  {
    image: "/images/feature-creator.png",
    title: "Cook Like a Creator",
    description:
      "Follow food creators and generate recipes in their signature style.",
  },
  {
    image: "/images/feature-nutrition.png",
    title: "Nutrition Tracking",
    description:
      "Snap a photo of your plate. AI estimates calories, macros, and micronutrients.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-g-150/50 bg-warm/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <AnimatedLogo className="h-8 w-auto" />
          <a
            href="#waitlist"
            className="rounded-[14px] bg-black px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-g-800 active:scale-[0.98]"
          >
            Join Beta
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
        {/* Background gradient orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-light/60 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-brand-medium/30 blur-[100px]" />

        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
          {/* Beta badge */}
          <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-brand-medium bg-brand-light px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span className="text-sm font-semibold text-brand-dark">
              Beta launching soon
            </span>
          </div>

          <h1
            className="animate-fade-in-up font-display text-5xl leading-[1.1] italic text-g-800 sm:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Cook like someone
            <br />
            you love
          </h1>

          <p
            className="animate-fade-in-up mt-6 max-w-lg text-lg leading-relaxed text-g-500 sm:text-xl"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            Your fridge, your taste, your skill level — AI that actually knows
            how you cook. Scan ingredients, generate recipes, get guided
            step-by-step.
          </p>

          {/* Waitlist form */}
          <div
            id="waitlist"
            className="animate-fade-in-up mt-10 w-full max-w-md"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            <Suspense fallback={<div className="h-14" />}>
              <WaitlistForm />
            </Suspense>
          </div>

          {/* App demo showcase */}
          <div
            className="animate-fade-in-up mt-16 w-full"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            <DemoShowcaseLoader />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <RevealSection className="mb-16 text-center">
            <h2 className="font-display text-4xl italic text-g-800 sm:text-5xl">
              Everything your kitchen needs
            </h2>
            <p className="mt-4 text-lg text-g-500">
              Powered by AI that understands food, not just data.
            </p>
          </RevealSection>

          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <StaggerItem
                key={feature.title}
                className="group overflow-hidden rounded-[16px] border border-g-150 bg-white transition-all hover:border-brand-medium hover:shadow-lg"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-g-800">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-g-500">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <RevealSection className="text-center">
            <h2 className="font-display text-4xl italic text-g-800 sm:text-5xl">
              Three steps to dinner
            </h2>
          </RevealSection>

          <div className="mt-16 flex flex-col gap-12 sm:gap-16">
            {[
              {
                step: "01",
                title: "Scan what you have",
                desc: "Open your fridge door, snap a photo. Our AI identifies every ingredient — or scan a receipt, grocery bag, or type it in.",
              },
              {
                step: "02",
                title: "Get recipes that fit",
                desc: "AI generates personalized recipes using what's in your fridge. Filtered by your dietary preferences, skill level, and time.",
              },
              {
                step: "03",
                title: "Cook with confidence",
                desc: "Step-by-step guidance with real-time substitutions, timers, and tips. Like having a chef in your kitchen.",
              },
            ].map((item, i) => (
              <RevealSection
                key={item.step}
                delay={i * 0.15}
                className="flex gap-6 sm:gap-10"
              >
                <span className="font-display text-5xl italic text-brand-medium sm:text-6xl">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-g-800">{item.title}</h3>
                  <p className="mt-2 max-w-md text-g-500">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-warm via-brand-light/20 to-warm" />
        <RevealSection className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="font-display text-4xl italic text-g-800 sm:text-5xl">
            Ready to cook smarter?
          </h2>
          <p className="mt-4 text-lg text-g-500">
            Be first in line when Pantrẽ launches. Early access members get Pro
            free for 3 months.
          </p>
          <div className="mt-8 w-full max-w-md">
            <Suspense fallback={<div className="h-14" />}>
              <WaitlistForm minimal />
            </Suspense>
          </div>
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="border-t border-g-150 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-display text-xl italic text-g-800">
            Pantrẽ
          </span>
          <p className="text-sm text-g-400">
            &copy; {new Date().getFullYear()} Pantrẽ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
