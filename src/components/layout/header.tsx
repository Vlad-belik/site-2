
"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/90 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-center px-4">
        <Link href="/" className="relative h-16 w-64 transition-transform hover:scale-105">
          <Image 
            src="/my-image.png" 
            alt="PSIH Logo" 
            fill 
            className="object-contain grayscale brightness-200"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
