
"use client";

import Link from "next/link";
import { usePSIHStore } from "@/lib/store";
import { Ghost, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { togglePsychFilter, togglePsychRealm, isPsychFilterActive } = usePSIHStore();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/90 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-white hover:glitch-text transition-all">
          PSIH
        </Link>

        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={togglePsychFilter}
            className={`text-white transition-colors h-10 w-10 ${isPsychFilterActive ? 'text-primary' : ''}`}
          >
            <Ghost className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={togglePsychRealm}
            className="text-white hover:text-primary transition-colors h-10 w-10"
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="bg-primary text-white text-[8px] uppercase tracking-[0.3em] font-bold py-1 text-center animate-flicker">
        FREE SHIPPING OVER 10 000 ₽
      </div>
    </header>
  );
}
