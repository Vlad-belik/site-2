"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Save, ShoppingCart } from "lucide-react";

const LAYERS = {
  top: [
    { id: 't1', name: 'HOODIE VOID', img: 'https://picsum.photos/seed/t1/400/500' },
    { id: 't2', name: 'TEE BLEED', img: 'https://picsum.photos/seed/t2/400/500' },
    { id: 't3', name: 'JACKET PSYCH', img: 'https://picsum.photos/seed/t3/400/500' },
  ],
  bottom: [
    { id: 'b1', name: 'CARGO ABYSS', img: 'https://picsum.photos/seed/b1/400/500' },
    { id: 'b2', name: 'DENIM ASH', img: 'https://picsum.photos/seed/b2/400/500' },
    { id: 'b3', name: 'SWEATS DARK', img: 'https://picsum.photos/seed/b3/400/500' },
  ]
};

export default function BuilderPage() {
  const { toast } = useToast();
  const [outfit, setOutfit] = useState({ top: LAYERS.top[0], bottom: LAYERS.bottom[0] });

  const saveOutfit = () => {
    toast({ title: "Сохранено", description: "Твой образ сохранен в твоем профиле" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-12">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-7xl font-bold tracking-tighter text-white uppercase glitch-text">BUILDER</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Собери свой идеальный кошмар</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Selector Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <h3 className="text-white font-headline text-sm uppercase tracking-widest border-l-2 border-primary pl-4">ВЕРХ</h3>
              <div className="grid grid-cols-2 gap-2">
                {LAYERS.top.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setOutfit(prev => ({ ...prev, top: item }))}
                    className={`relative aspect-[3/4] border transition-all ${outfit.top.id === item.id ? 'border-primary' : 'border-border'}`}
                  >
                    <Image src={item.img} alt={item.name} fill className="object-cover grayscale" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-headline text-sm uppercase tracking-widest border-l-2 border-primary pl-4">НИЗ</h3>
              <div className="grid grid-cols-2 gap-2">
                {LAYERS.bottom.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setOutfit(prev => ({ ...prev, bottom: item }))}
                    className={`relative aspect-[3/4] border transition-all ${outfit.bottom.id === item.id ? 'border-primary' : 'border-border'}`}
                  >
                    <Image src={item.img} alt={item.name} fill className="object-cover grayscale" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mannequin Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[1/2] border-x border-border bg-muted/5 p-4 flex flex-col gap-2 items-center justify-center">
              <div className="relative w-full h-[45%] border border-border overflow-hidden">
                <Image src={outfit.top.img} alt="Top" fill className="object-cover grayscale" />
              </div>
              <div className="relative w-full h-[55%] border border-border overflow-hidden">
                <Image src={outfit.bottom.img} alt="Bottom" fill className="object-cover grayscale" />
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button variant="ghost" size="icon" className="bg-black/60 border border-white/20 text-white rounded-none">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="lg:col-span-3 space-y-8">
            <div className="p-6 border border-border bg-muted/5 space-y-6">
              <h3 className="text-white font-headline text-lg font-bold tracking-tight uppercase">ТВОЙ ОБРАЗ</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                  <span>ВЕРХ:</span>
                  <span className="text-white">{outfit.top.name}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                  <span>НИЗ:</span>
                  <span className="text-white">{outfit.bottom.name}</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between font-bold text-primary">
                  <span>ИТОГО:</span>
                  <span>15 540 ₽</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-white text-black font-bold uppercase rounded-none tracking-widest h-12 hover:bg-primary hover:text-white transition-all">
                  <ShoppingCart className="h-4 w-4 mr-2" /> В КОРЗИНУ ОБА
                </Button>
                <Button 
                  onClick={saveOutfit}
                  variant="outline" 
                  className="w-full border-border text-white font-bold uppercase rounded-none tracking-widest h-12"
                >
                  <Save className="h-4 w-4 mr-2" /> СОХРАНИТЬ ЛУК
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
