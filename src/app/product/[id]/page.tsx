
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

  // Mock data - in a real app, fetch from Firestore
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
    <div className="container mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-muted-foreground mb-16 overflow-x-auto whitespace-nowrap">
        <a href="/" className="hover:text-white transition-colors">ГЛАВНАЯ</a>
        <ChevronRight className="h-3 w-3" />
        <a href="/shop" className="hover:text-white transition-colors">КАТАЛОГ</a>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Images Column */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
          <div className="flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`relative w-24 md:w-32 aspect-[3/4] border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-primary' : 'border-border grayscale hover:grayscale-0'}`}
              >
                <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 relative aspect-[3/4] border-2 border-border order-1 md:order-2 bg-muted/5 group overflow-hidden">
            <Image 
              src={product.images[activeImage]} 
              alt={product.name} 
              fill 
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
              priority
            />
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <span className="bg-black border border-white/20 text-white text-[9px] font-bold px-4 py-1.5 uppercase tracking-widest">OVERSIZED FIT</span>
              <span className="bg-primary text-white text-[9px] font-bold px-4 py-1.5 uppercase tracking-widest">HANDMADE FINISH</span>
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="font-headline text-6xl md:text-7xl font-bold tracking-tighter text-white glitch-text uppercase">{product.name}</h1>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`mt-4 p-2 border border-border transition-colors ${isWishlisted ? 'text-primary border-primary' : 'text-muted-foreground hover:text-white hover:border-white'}`}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
            <p className="text-4xl font-bold text-primary font-headline tracking-tighter">{product.price.toLocaleString()} ₽</p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
              <span>РАЗМЕР</span>
              <button className="text-muted-foreground hover:text-white underline underline-offset-8 decoration-primary">ТАБЛИЦА РАЗМЕРОВ</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-4 text-xs font-bold border-2 transition-all uppercase tracking-widest ${
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

          <div className="flex flex-col gap-4">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-primary text-white hover:bg-white hover:text-black font-headline font-bold text-xl py-12 rounded-none uppercase tracking-[0.3em] transition-all"
            >
              ДОБАВИТЬ В КОРЗИНУ
            </Button>
            <Button variant="outline" className="w-full border-border text-white hover:bg-white hover:text-black rounded-none h-14 uppercase tracking-widest text-xs font-bold">
              <Share2 className="h-4 w-4 mr-2" /> ПОДЕЛИТЬСЯ С БЕЗДНОЙ
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-border py-8">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div className="text-[9px] font-bold uppercase tracking-widest">
                <p className="text-white">ДОСТАВКА 1-3 ДНЯ</p>
                <p className="text-muted-foreground">КУРЬЕР ИЛИ ПВЗ</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div className="text-[9px] font-bold uppercase tracking-widest">
                <p className="text-white">100% ОРИГИНАЛ</p>
                <p className="text-muted-foreground">ПАСПОРТ ИЗДЕЛИЯ</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-4 border-l-2 border-primary pl-4">ОПИСАНИЕ</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">{product.description}</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-4 border-l-2 border-primary pl-4">ДЕТАЛИ И УХОД</h3>
              <ul className="text-[10px] text-muted-foreground space-y-2 uppercase font-bold tracking-widest">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"/> 100% ТЯЖЕЛЫЙ ХЛОПОК (420 Г/М²)</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"/> ШЕЛКОГРАФИЯ ВЫСОКОЙ ПЛОТНОСТИ</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"/> СТИРКА ПРИ 30° ВЫВЕРНУТЫМ НАИЗНАНКУ</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"/> ГЛАДИТЬ С ИЗНАНОЧНОЙ СТОРОНЫ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
