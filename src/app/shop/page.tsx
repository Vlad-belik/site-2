"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const CATEGORIES = ["ВСЕ", "ХУДИ", "ФУТБОЛКИ", "БРЮКИ", "АКСЕССУАРЫ"];
const PRODUCTS = [
  { id: '1', name: 'HOODIE "VOID"', category: 'ХУДИ', price: 6660, img: 'https://picsum.photos/seed/void-hoodie/800/1000' },
  { id: '2', name: 'TEE "SKULLBURNING"', category: 'ФУТБОЛКИ', price: 3330, img: 'https://picsum.photos/seed/skull-tee/800/1000' },
  { id: '3', name: 'CARGO "ABYSS"', category: 'БРЮКИ', price: 8880, img: 'https://picsum.photos/seed/abyss-cargo/800/1000' },
  { id: '4', name: 'JACKET "PSYCH"', category: 'ХУДИ', price: 12000, img: 'https://picsum.photos/seed/psych-jacket/800/1000' },
  { id: '5', name: 'CAP "BLIND"', category: 'АКСЕССУАРЫ', price: 2500, img: 'https://picsum.photos/seed/cap/800/1000' },
  { id: '6', name: 'TEE "BLEED"', category: 'ФУТБОЛКИ', price: 3990, img: 'https://picsum.photos/seed/bleed-tee/800/1000' },
  { id: '7', name: 'PANTS "VOID"', category: 'БРЮКИ', price: 7770, img: 'https://picsum.photos/seed/v-pants/800/1000' },
  { id: '8', name: 'HOODIE "BLOOD"', category: 'ХУДИ', price: 6900, img: 'https://picsum.photos/seed/b-hood/800/1000' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("ВСЕ");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = PRODUCTS.filter(p => 
    activeCategory === "ВСЕ" || p.category === activeCategory
  ).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0; // newest as default
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-6 md:gap-8 mb-10 md:mb-16">
        <h1 className="font-headline text-6xl md:text-[10vw] font-bold tracking-tighter text-white uppercase glitch-text leading-none">КАТАЛОГ</h1>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-y border-border py-4 md:py-6">
          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 gap-2 md:gap-3">
            {CATEGORIES.map(cat => (
              <Button 
                key={cat} 
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-none font-bold uppercase tracking-widest text-[9px] md:text-[10px] h-9 md:h-10 px-4 md:px-6 transition-all border-border whitespace-nowrap ${
                  activeCategory === cat ? 'bg-primary text-white border-primary' : 'bg-transparent text-white hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto pt-2 md:pt-0">
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-bold whitespace-nowrap">СОРТ:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[220px] bg-black border-border text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-none h-9 md:h-10 px-4">
                <SelectValue placeholder="Сначала новые" />
              </SelectTrigger>
              <SelectContent className="bg-black border-border text-white rounded-none">
                <SelectItem value="newest" className="text-[10px] font-bold uppercase tracking-widest focus:bg-primary focus:text-white">Сначала новые</SelectItem>
                <SelectItem value="price-asc" className="text-[10px] font-bold uppercase tracking-widest focus:bg-primary focus:text-white">Дешевле</SelectItem>
                <SelectItem value="price-desc" className="text-[10px] font-bold uppercase tracking-widest focus:bg-primary focus:text-white">Дороже</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-24 md:py-32 text-center border border-dashed border-border">
          <p className="font-headline text-lg md:text-2xl text-muted-foreground uppercase tracking-[0.5em] animate-pulse px-4">Ничего не найдено в этой бездне</p>
        </div>
      )}
      
      <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-border flex justify-center">
        <Button variant="outline" className="w-full md:w-auto rounded-none border-border text-muted-foreground hover:text-white font-bold uppercase tracking-[0.3em] px-12 py-6 md:py-8">
          ЕЩЁ ТОВАРЫ
        </Button>
      </div>
    </div>
  );
}