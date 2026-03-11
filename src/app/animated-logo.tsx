"use client";

export function AnimatedLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pantrẽ"
    >
      <style>{`
        .stroke-p {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-stroke 0.6s ease-out forwards;
        }
        .stroke-slash {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-stroke 0.3s ease-out 0.5s forwards;
        }
        .fill-p {
          opacity: 0;
          animation: fade-in 0.3s ease-out 0.7s forwards;
        }
        .fill-slash {
          opacity: 0;
          animation: fade-in 0.3s ease-out 0.8s forwards;
        }
        @keyframes draw-stroke {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
      `}</style>

      {/* P letter - stroke animation */}
      <text
        x="2"
        y="32"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="36"
        fontWeight="800"
        className="stroke-p"
        stroke="#212529"
        strokeWidth="1.5"
        fill="none"
      >
        P
      </text>

      {/* / slash - stroke animation */}
      <text
        x="24"
        y="32"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="36"
        fontWeight="800"
        className="stroke-slash"
        stroke="#1a9e5f"
        strokeWidth="1.5"
        fill="none"
      >
        /
      </text>

      {/* P letter - fill fade in */}
      <text
        x="2"
        y="32"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="36"
        fontWeight="800"
        className="fill-p"
        fill="#212529"
      >
        P
      </text>

      {/* / slash - fill fade in */}
      <text
        x="24"
        y="32"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="36"
        fontWeight="800"
        className="fill-slash"
        fill="#1a9e5f"
      >
        /
      </text>
    </svg>
  );
}
