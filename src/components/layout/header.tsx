
"use client";

import Link from "next/link";
import { usePSIHStore } from "@/lib/store";
import { ShoppingCart, Ghost, Eye, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { AuthModal } from "@/components/auth/auth-modal";

export function Header() {
  const { cart, wishlist, togglePsychFilter, togglePsychRealm, isPsychFilterActive } = usePSIHStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black border-r border-border text-white p-0">
              <SheetHeader className="p-6 border-b border-border">
                <SheetTitle className="text-white font-headline text-2xl tracking-tighter">НАВИГАЦИЯ</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-6 gap-6 font-headline text-lg uppercase tracking-widest">
                <Link href="/shop" className="hover:text-primary transition-colors">КАТАЛОГ</Link>
                <Link href="/builder" className="hover:text-primary transition-colors">КОНСТРУКТОР</Link>
                <Link href="/visions" className="hover:text-primary transition-colors">VISIONS</Link>
                <Link href="/account" className="hover:text-primary transition-colors">ЛИЧНЫЙ КАБИНЕТ</Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="font-headline text-3xl font-bold tracking-tighter text-white hover:glitch-text transition-all">
            PSIH
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-headline text-sm uppercase tracking-[0.2em] text-white">
          <Link href="/shop" className="hover:text-primary transition-colors">КАТАЛОГ</Link>
          <Link href="/builder" className="hover:text-primary transition-colors">КОНСТРУКТОР</Link>
          <Link href="/visions" className="hover:text-primary transition-colors">VISIONS</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={togglePsychFilter}
            className={`text-white transition-colors ${isPsychFilterActive ? 'text-primary' : ''}`}
            title="VHS Filter"
          >
            <Ghost className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={togglePsychRealm}
            className="text-white hover:text-primary transition-colors"
            title="Psych Realm"
          >
            <Eye className="h-5 w-5" />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />

          <Link href="/account">
            <Button variant="ghost" size="icon" className="relative text-white hidden sm:flex">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-primary p-0 text-[10px]">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-white">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-primary p-0 text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <AuthModal />
        </div>
      </div>
      
      <div className="bg-primary text-white text-[10px] uppercase tracking-[0.3em] font-bold py-1 text-center animate-flicker">
        БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ ОТ 10 000 ₽
      </div>
    </header>
  );
}
