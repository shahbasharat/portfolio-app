"use client";

import React from "react";

export default function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.08]">
      <svg className="fixed inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
