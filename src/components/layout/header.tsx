
"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/90 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-center px-4">
        <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-white hover:glitch-text transition-all">
          PSIH
        </Link>
      </div>
      
      <div className="bg-primary text-white text-[8px] uppercase tracking-[0.3em] font-bold py-1 text-center animate-flicker">
        FREE SHIPPING OVER 10 000 ₽
      </div>
    </header>
  );
}
