"use client";

import { usePSIHStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";

export function PsychFilterWrapper({ children }: { children: React.ReactNode }) {
  const isPsychFilterActive = usePSIHStore((state) => state.isPsychFilterActive);

  return (
    <div className={cn(
      "min-h-screen transition-all duration-700 ease-in-out",
      isPsychFilterActive && "vhs-effect grayscale-[20%] brightness-[70%]"
    )}>
      {isPsychFilterActive && (
        <>
          <div className="fixed inset-0 z-[9999] pointer-events-none opacity-20">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/id/10/200/200')] bg-repeat opacity-5 mix-blend-overlay"></div>
            <div className="scanline"></div>
          </div>
          <svg className="hidden">
            <filter id="glitch">
              <feTurbulence type="fractalNoise" baseFrequency="0.00001" numOctaves="1" result="noise">
                <animate attributeName="baseFrequency" from="0.00001" to="0.01" dur="2s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            </filter>
          </svg>
        </>
      )}
      {children}
    </div>
  );
}
