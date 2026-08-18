import React from "react";

export function VegGoLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none cursor-pointer ${className}`}>
      <svg viewBox="0 0 160 56" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Leaf sprout icon */}
        <g transform="translate(4, 2)">
          {/* Main Leaf */}
          <path
            d="M24 2C24 2 34 8 36 22C32 26 22 28 14 20C12 12 18 4 24 2Z"
            fill="url(#leafGrad)"
          />
          {/* Side Leaf */}
          <path
            d="M12 14C12 14 6 18 6 26C10 28 18 28 20 22C20 18 16 14 12 14Z"
            fill="url(#leafGrad2)"
          />
          {/* Stylized V branch */}
          <path
            d="M14 26L26 44L38 18L30 18L24 33L18 22L14 26Z"
            fill="url(#goldGrad)"
          />
        </g>

        {/* VegGo text */}
        <text
          x="50"
          y="34"
          fontFamily="'Poppins', sans-serif"
          fontWeight="800"
          fontSize="28"
          fill="#2E7D32"
          letterSpacing="-0.5"
        >
          Veg
          <tspan fill="#E5A93C">Go</tspan>
        </text>

        {/* Small Leaf over Go */}
        <path
          d="M140 12C140 12 144 14 145 18C143 19 140 19 138 17C137 15 138 13 140 12Z"
          fill="#3F9142"
        />

        {/* FRESH subtext */}
        <g transform="translate(52, 42)">
          <line x1="0" y1="4" x2="16" y2="4" stroke="#7BA87D" strokeWidth="1" strokeLinecap="round" />
          <text
            x="22"
            y="7"
            fontFamily="'Poppins', sans-serif"
            fontWeight="600"
            fontSize="8"
            fill="#3F9142"
            letterSpacing="3"
          >
            FRESH
          </text>
          <line x1="72" y1="4" x2="88" y2="4" stroke="#7BA87D" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Tagline */}
        <text
          x="50"
          y="53"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          fontSize="4.5"
          fill="#768B78"
          letterSpacing="1.2"
        >
          FRESH. FAST. TRUSTED.
        </text>

        <defs>
          <linearGradient id="leafGrad" x1="14" y1="2" x2="36" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55B358" />
            <stop offset="1" stopColor="#1E5F26" />
          </linearGradient>
          <linearGradient id="leafGrad2" x1="6" y1="14" x2="20" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7CD97F" />
            <stop offset="1" stopColor="#2E7D32" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="14" y1="18" x2="38" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5BE4D" />
            <stop offset="1" stopColor="#D48B1B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
