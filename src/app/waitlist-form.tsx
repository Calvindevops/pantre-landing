"use client";

import { useState, useTransition } from "react";
import { joinWaitlist } from "./actions";

export function WaitlistForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await joinWaitlist(formData);
      setResult(res);
    });
  }

  if (result?.success) {
    return (
      <div className="animate-fade-in-up flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light">
          <svg
            className="h-6 w-6 text-brand"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-center font-semibold text-g-800">{result.message}</p>
        <p className="text-sm text-g-400">Check your inbox for updates.</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className="flex-1 rounded-[14px] border border-g-150 bg-white px-5 py-4 text-[15px] text-g-800 placeholder:text-g-400 outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand-light"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-[14px] bg-black px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:bg-g-800 active:scale-[0.98] disabled:opacity-40"
      >
        {isPending ? "Joining..." : "Join Waitlist"}
      </button>
      {result && !result.success && (
        <p className="text-sm text-red-500">{result.message}</p>
      )}
    </form>
  );
}
