"use client";

import { useState, useTransition, useEffect } from "react";
import { joinWaitlist, getWaitlistCount } from "./actions";
import { useSearchParams } from "next/navigation";

function SharePanel({ refCode, position }: { refCode: string; position: number }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://pantre.app?ref=${refCode}`;
  const shareText = "I just joined the Pantrẽ waitlist — AI that knows your fridge, your taste, and how you cook. Get early access:";

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="animate-fade-in-up flex flex-col items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light">
        <svg
          className="h-6 w-6 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-center text-lg font-bold text-g-800">
        You&apos;re #{position} on the list!
      </p>
      <p className="text-center text-sm text-g-500">
        Share your link to move up. Top referrers get Pro free for 3 months.
      </p>

      {/* Share link */}
      <div className="flex w-full max-w-sm items-center gap-2 rounded-[14px] border border-g-150 bg-white p-2">
        <span className="flex-1 truncate px-3 text-sm text-g-500">{shareUrl}</span>
        <button
          onClick={copyLink}
          className="shrink-0 rounded-[10px] bg-black px-4 py-2 text-sm font-bold text-white transition-all active:scale-[0.98]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Social share buttons */}
      <div className="flex gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-g-100 transition-colors hover:bg-g-150"
        >
          <svg className="h-4 w-4 text-g-800" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-g-100 transition-colors hover:bg-g-150"
        >
          <svg className="h-4 w-4 text-g-800" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        <a
          href={`sms:?body=${encodeURIComponent(shareText + " " + shareUrl)}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-g-100 transition-colors hover:bg-g-150"
        >
          <svg className="h-4 w-4 text-g-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function SignupCounter({ count }: { count: number }) {
  if (count < 5) return null;
  return (
    <p className="mt-3 flex items-center justify-center gap-2 text-sm text-g-500">
      <span className="flex -space-x-1.5">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-warm bg-brand-light text-[8px] font-bold text-brand-dark"
          >
            {String.fromCharCode(65 + i)}
          </span>
        ))}
      </span>
      <span>
        <strong className="font-semibold text-g-800">{count.toLocaleString()}</strong> people
        on the waitlist
      </span>
    </p>
  );
}

export function WaitlistForm({ minimal = false }: { minimal?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    refCode?: string;
    position?: number;
  } | null>(null);
  const [count, setCount] = useState(0);
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  useEffect(() => {
    getWaitlistCount().then(setCount);
  }, []);

  function handleSubmit(formData: FormData) {
    if (ref) formData.set("ref", ref);
    startTransition(async () => {
      const res = await joinWaitlist(formData);
      setResult(res);
      if (res.success) setCount((c) => c + 1);
    });
  }

  if (result?.success && result.refCode) {
    return <SharePanel refCode={result.refCode} position={result.position ?? 0} />;
  }

  return (
    <div>
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
      </form>
      {result && !result.success && (
        <p className="mt-2 text-sm text-red-500">{result.message}</p>
      )}
      {!minimal && <SignupCounter count={count} />}
      {!minimal && count < 5 && (
        <p className="mt-3 text-xs text-g-400">
          Free to join. No spam, ever. Early access for first 500 signups.
        </p>
      )}
    </div>
  );
}
