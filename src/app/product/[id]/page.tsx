"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { usePSIHStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Heart, Share2, ShieldCheck, Truck } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = usePSIHStore();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const isWishlisted = wishlist.includes(id as string);

  const product = {
    id: id as string,
    name: 'HOODIE "VOID"',
    price: 6660,
    category: 'ХУДИ',
    description: 'Оверсайз худи из плотного футера с эффектом "варки". Принт выполнен методом шелкографии. Края изделия необработаны для создания эффекта деконструкции. Каждое изделие уникально благодаря ручной обработке.',
    images: [
      'https://picsum.photos/seed/void-1/1000/1200',
      'https://picsum.photos/seed/void-2/1000/1200',
      'https://picsum.photos/seed/void-3/1000/1200',
    ],
    sizes: ['S', 'M', 'L', 'XL']
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Ошибка",
        description: "Выберите размер перед добавлением в корзину",
        variant: "destructive"
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      size: selectedSize
    });

    toast({
      title: "Добавлено",
      description: `${product.name} (размер ${selectedSize}) в корзине.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <nav className="flex items-center gap-2 text-[8px] md:text-[9px] uppercase tracking-widest text-muted-foreground mb-8 md:mb-16 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <a href="/" className="hover:text-white transition-colors">ГЛАВНАЯ</a>
        <ChevronRight className="h-2 w-2 md:h-3 md:w-3" />
        <a href="/shop" className="hover:text-white transition-colors">КАТАЛОГ</a>
        <ChevronRight className="h-2 w-2 md:h-3 md:w-3" />
        <span className="text-white font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        {/* Images Column */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`relative w-20 md:w-32 aspect-[3/4] border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-primary' : 'border-border grayscale hover:grayscale-0'}`}
              >
                <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" data-ai-hint="cloth preview" />
              </button>
            ))}
          </div>
          <div className="flex-1 relative aspect-[3/4] border-2 border-border order-1 md:order-2 bg-muted/5 group overflow-hidden">
            <Image 
              src={product.images[activeImage]} 
              alt={product.name} 
              fill 
              className="object-cover grayscale md:group-hover:grayscale-0 transition-all duration-1000" 
              priority
              data-ai-hint="cloth main"
            />
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-2 md:gap-3">
              <span className="bg-black border border-white/20 text-white text-[8px] md:text-[9px] font-bold px-3 py-1 md:px-4 md:py-1.5 uppercase tracking-widest">OVERSIZED FIT</span>
              <span className="bg-primary text-white text-[8px] md:text-[9px] font-bold px-3 py-1 md:px-4 md:py-1.5 uppercase tracking-widest">HANDMADE FINISH</span>
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
          <div>
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tighter text-white glitch-text uppercase leading-tight">{product.name}</h1>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`mt-2 p-2 border border-border transition-colors ${isWishlisted ? 'text-primary border-primary' : 'text-muted-foreground hover:text-white hover:border-white'}`}
              >
                <Heart className={`h-5 w-5 md:h-6 md:w-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
            <p className="text-2xl md:text-4xl font-bold text-primary font-headline tracking-tighter">{product.price.toLocaleString()} ₽</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="flex justify-between items-center text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
              <span>РАЗМЕР</span>
              <button className="text-muted-foreground hover:text-white underline underline-offset-4 md:underline-offset-8 decoration-primary">ТАБЛИЦА</button>
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 md:py-4 text-[10px] md:text-xs font-bold border-2 transition-all uppercase tracking-widest ${
                    selectedSize === size 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-white border-border hover:border-white hover:bg-muted/10'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-primary text-white hover:bg-white hover:text-black font-headline font-bold text-lg md:text-xl py-8 md:py-12 rounded-none uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all"
            >
              В КОРЗИНУ
            </Button>
            <Button variant="outline" className="w-full border-border text-white hover:bg-white hover:text-black rounded-none h-12 md:h-14 uppercase tracking-widest text-[10px] md:text-xs font-bold">
              <Share2 className="h-4 w-4 mr-2" /> ПОДЕЛИТЬСЯ
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 border-y border-border py-6 md:py-8">
            <div className="flex items-center gap-2 md:gap-3">
              <Truck className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
                <p className="text-white">1-3 ДНЯ</p>
                <p className="text-muted-foreground">ДОСТАВКА</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
                <p className="text-white">100% QUALITY</p>
                <p className="text-muted-foreground">ГАРАНТИЯ</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-white font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-3 md:mb-4 border-l-2 border-primary pl-4">ОПИСАНИЕ</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">{product.description}</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-3 md:mb-4 border-l-2 border-primary pl-4">УХОД</h3>
              <ul className="text-[8px] md:text-[10px] text-muted-foreground space-y-2 uppercase font-bold tracking-widest">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"/> 100% ТЯЖЕЛЫЙ ХЛОПОК</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"/> СТИРКА ПРИ 30°</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"/> ГЛАДИТЬ С ИЗНАНКИ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}