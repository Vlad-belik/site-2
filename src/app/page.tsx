
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

  const logoImage = PlaceHolderImages.find(img => img.id === 'logo');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden border-b border-border">
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
        <div className="absolute bottom-12 left-6 z-20 md:left-12">
          <Link href="#" className="text-white/40 hover:text-white transition-colors">
            <Instagram className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>
        <div className="absolute bottom-12 right-6 z-20 md:right-12">
          <Link href="#" className="text-white/40 hover:text-white transition-colors">
            <Send className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>

        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
          {/* Logo Replacement with Glitch Effect */}
          <div className="relative w-full max-w-[80vw] md:max-w-2xl aspect-[2/1] mb-8 glitch-image">
            <Image 
              src={logoImage?.imageUrl || "https://picsum.photos/seed/psih-logo/800/400"} 
              alt="PSIH Logo" 
              fill 
              className="object-contain grayscale brightness-200"
              priority
              data-ai-hint={logoImage?.imageHint || "horror logo"}
            />
          </div>
          
          <div className="flex justify-center gap-4 w-full max-w-[320px] mx-auto">
            <Link href="/shop?gender=men" className="flex-1">
              <Button className="w-full bg-white text-black hover:bg-primary hover:text-white font-headline font-bold text-xs py-6 transition-all uppercase tracking-[0.2em] rounded-none">
                MEN
              </Button>
            </Link>
            <Link href="/shop?gender=women" className="flex-1">
              <Button className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black font-headline font-bold text-xs py-6 transition-all uppercase tracking-[0.2em] rounded-none">
                WOMEN
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12 md:mb-16 border-b border-border pb-6 md:pb-8">
          <div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase">Новинки</h2>
            <p className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest mt-2">Latest additions to the psych realm</p>
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
              <h3 className="font-headline text-xs md:text-lg font-bold tracking-tight text-white uppercase truncate">{product.name}</h3>
              <p className="text-primary text-xs md:text-base font-bold mt-1">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Aesthetic Section */}
      <section className="py-24 md:py-32 bg-muted/30 border-y border-border overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-headline text-[40vw] md:text-[30vw] font-bold text-white tracking-tighter select-none">
            VOID
           </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tighter glitch-text uppercase">ДЛЯ ТВОЕГО СКЕЛЕТА</h2>
            <p className="text-sm md:text-lg text-muted-foreground leading-relaxed italic px-4">
              "Одежда PSIH не просто скрывает твоё тело. Она проявляет твою суть. Мрачная эстетика улиц, рожденная в подвалах и вдохновленная кошмарами."
            </p>
          </div>
        </div>
      </section>

      {/* Visions Preview */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left">
            <h2 className="font-headline text-5xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">Psych<br/><span className="text-primary">Visions</span></h2>
            <p className="text-sm md:text-xl text-muted-foreground uppercase tracking-widest">Галерея сообщества</p>
            <p className="text-xs md:text-sm leading-relaxed text-muted-foreground max-w-md mx-auto md:mx-0">
              Загрузи свой образ и стань частью безумия. Наш ИИ создаст уникальную атмосферу для твоих фото.
            </p>
            <Link href="/visions" className="block">
              <Button className="w-full md:w-auto bg-primary text-white hover:bg-white hover:text-black font-bold px-12 py-6 transition-all uppercase rounded-none tracking-widest">
                ПРИСОЕДИНИТЬСЯ
              </Button>
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="aspect-square bg-muted relative border border-border">
              <Image src="https://picsum.photos/seed/v1/500/500" alt="Vision 1" fill className="object-cover grayscale hover:grayscale-0 transition-all" data-ai-hint="horror fashion" />
            </div>
            <div className="aspect-square bg-muted relative border border-border mt-6 md:mt-8">
              <Image src="https://picsum.photos/seed/v2/500/500" alt="Vision 2" fill className="object-cover grayscale hover:grayscale-0 transition-all" data-ai-hint="dark model" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
