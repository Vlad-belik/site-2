
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Instagram, Send } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const newArrivals = [
    { id: '1', name: 'HOODIE "VOID"', price: '6,660 ₽', img: 'https://picsum.photos/seed/void-hoodie/800/1000' },
    { id: '2', name: 'TEE "SKULLBURNING"', price: '3,330 ₽', img: 'https://picsum.photos/seed/skull-tee/800/1000' },
    { id: '3', name: 'CARGO "ABYSS"', price: '8,880 ₽', img: 'https://picsum.photos/seed/abyss-cargo/800/1000' },
    { id: '4', name: 'JACKET "PSYCH"', price: '12,000 ₽', img: 'https://picsum.photos/seed/psych-jacket/800/1000' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/psih-hero/1920/1080" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-40 grayscale"
            priority
            data-ai-hint="dark streetwear"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        
        {/* Side Icons */}
        <div className="absolute bottom-8 left-6 z-20 md:bottom-12 md:left-12 flex gap-6 md:gap-4">
          <Link href="#" className="text-white/60 hover:text-white transition-colors">
            <Instagram className="h-5 w-5 md:h-5 md:w-5" />
          </Link>
          <Link href="#" className="text-white/60 hover:text-white transition-colors">
            <Send className="h-5 w-5 md:h-5 md:w-5" />
          </Link>
        </div>

        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
          {/* Logo with Glitch Effect */}
          <div className="relative w-full max-w-[85vw] md:max-w-xl aspect-[2/1] mb-10 md:mb-12 glitch-image">
            <Image 
              src="/my-image.png" 
              alt="PSIH Logo" 
              fill 
              className="object-contain grayscale brightness-200"
              priority
              data-ai-hint="horror logo"
            />
          </div>
          
          {/* Compressed Buttons for Mobile */}
          <div className="flex justify-center gap-4 w-full max-w-[320px] md:max-w-sm mx-auto">
            <Link href="/shop?gender=men" className="flex-1">
              <Button className="w-full bg-white text-black hover:bg-primary hover:text-white font-headline font-bold text-[12px] md:text-[11px] py-4 md:py-4 transition-all uppercase tracking-[0.2em] rounded-none h-14 md:h-12 shadow-lg">
                MEN
              </Button>
            </Link>
            <Link href="/shop?gender=women" className="flex-1">
              <Button className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black font-headline font-bold text-[12px] md:text-[11px] py-4 md:py-4 transition-all uppercase tracking-[0.2em] rounded-none h-14 md:h-12 shadow-lg">
                WOMEN
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-12 md:py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8 md:mb-16 border-b border-border pb-4 md:pb-8">
          <div>
            <h2 className="font-headline text-2xl md:text-5xl font-bold tracking-tighter text-white uppercase">Новинки</h2>
            <p className="text-[9px] md:text-sm text-muted-foreground uppercase tracking-widest mt-1 md:mt-2">Latest additions to the psych realm</p>
          </div>
          <Link href="/shop" className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-primary hover:text-white transition-colors underline underline-offset-8">
            Все →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {newArrivals.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-3 md:mb-4 border border-border group-hover:border-primary transition-all">
                <Image 
                  src={product.img} 
                  alt={product.name} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  data-ai-hint="clothing photo"
                />
              </div>
              <h3 className="font-headline text-[10px] md:text-lg font-bold tracking-tight text-white uppercase truncate">{product.name}</h3>
              <p className="text-primary text-[10px] md:text-base font-bold mt-1">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Aesthetic Section */}
      <section className="py-20 md:py-32 bg-muted/30 border-y border-border overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-headline text-[40vw] md:text-[30vw] font-bold text-white tracking-tighter select-none">
            VOID
           </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-headline text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tighter glitch-text uppercase">ДЛЯ ТВОЕГО СКЕЛЕТА</h2>
            <p className="text-xs md:text-lg text-muted-foreground leading-relaxed italic px-2">
              "Одежда PSIH не просто скрывает твоё тело. Она проявляет твою суть. Мрачная эстетика улиц, рожденная в подвалах и вдохновленная кошмарами."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
