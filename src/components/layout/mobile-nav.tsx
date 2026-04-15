
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePSIHStore } from "@/lib/store";
import { ShoppingCart, LayoutGrid, Hammer, Instagram, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { cart } = usePSIHStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: "SHOP", icon: LayoutGrid, href: "/shop" },
    { label: "BUILDER", icon: Hammer, href: "/builder" },
    { label: "CART", icon: ShoppingCart, href: "/cart", badge: cartCount },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-md">
      <nav className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center justify-between shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-12 rounded-full transition-all relative",
                isActive ? "text-primary" : "text-white/60"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[8px] font-bold mt-1 tracking-widest uppercase">
                {item.label}
              </span>
              {item.badge !== undefined && item.badge > 0 && (
                <Badge className="absolute top-1 right-2 h-4 w-4 flex items-center justify-center bg-primary p-0 text-[8px] border-none">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
        
        <div className="w-px h-6 bg-white/10 mx-1" />
        
        <div className="flex items-center gap-1">
          <Link 
            href="https://instagram.com" 
            target="_blank"
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link 
            href="https://t.me" 
            target="_blank"
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <Send className="h-5 w-5" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
