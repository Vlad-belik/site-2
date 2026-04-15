
"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/90 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-center px-4">
        <Link href="/" className="relative h-14 w-48 transition-transform hover:scale-105">
          <Image 
            src="/my-image.png" 
            alt="PSIH Logo" 
            fill 
            className="object-contain grayscale brightness-200"
            priority
          />
        </Link>
      </div>
      
      <div className="bg-primary text-white text-[8px] uppercase tracking-[0.3em] font-bold py-1 text-center animate-flicker">
        FREE SHIPPING OVER 10 000 ₽
      </div>
    </header>
  );
}
