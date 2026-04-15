"use client";

import { usePSIHStore } from "@/lib/store";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PsychRealm() {
  const isActive = usePSIHStore((state) => state.isPsychRealmActive);
  const toggle = usePSIHStore((state) => state.togglePsychRealm);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const particleCount = 40;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      char: string;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * 2 + 1;
        this.char = Math.random() > 0.5 ? "👁️" : "🩸";
        this.color = `rgba(139, 0, 0, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.char, this.x, this.y);
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrame: number;
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="font-headline text-8xl font-bold tracking-tighter text-primary glitch-text opacity-80">
          PSIH REALM
        </h1>
        <p className="mt-4 font-body text-xl text-muted-foreground uppercase tracking-widest">
          The void is staring back
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-8 right-8 text-white hover:bg-primary/20"
        onClick={toggle}
      >
        <X className="h-10 w-10" />
      </Button>
    </div>
  );
}
