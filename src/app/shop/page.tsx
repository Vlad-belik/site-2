
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
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8 mb-16">
        <h1 className="font-headline text-8xl md:text-[10vw] font-bold tracking-tighter text-white uppercase glitch-text leading-none">КАТАЛОГ</h1>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-y border-border py-6">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <Button 
                key={cat} 
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-none font-bold uppercase tracking-widest text-[10px] h-10 px-6 transition-all border-border ${
                  activeCategory === cat ? 'bg-primary text-white border-primary' : 'bg-transparent text-white hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold whitespace-nowrap">СОРТИРОВКА:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[220px] bg-black border-border text-white text-[10px] font-bold uppercase tracking-widest rounded-none h-10 px-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-32 text-center border border-dashed border-border">
          <p className="font-headline text-2xl text-muted-foreground uppercase tracking-[0.5em] animate-pulse">Ничего не найдено в этой бездне</p>
        </div>
      )}
      
      <div className="mt-24 pt-12 border-t border-border flex justify-center">
        <Button variant="outline" className="rounded-none border-border text-muted-foreground hover:text-white font-bold uppercase tracking-[0.3em] px-12 py-8">
          ПОКАЗАТЬ ЕЩЁ
        </Button>
      </div>
    </div>
  );
}
