
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePSIHStore } from "@/lib/store";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    img: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { wishlist, toggleWishlist } = usePSIHStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 border border-border group-hover:border-primary transition-all duration-500">
          <Image 
            src={product.img} 
            alt={product.name} 
            fill 
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white text-black font-bold px-6 py-2 uppercase tracking-widest text-[10px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              КУПИТЬ
            </span>
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest border border-primary">DROP 2026</span>
          </div>
        </div>
      </Link>
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-headline text-lg font-bold tracking-tight text-white uppercase group-hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">
            {product.category}
          </p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold whitespace-nowrap">{product.price.toLocaleString()} ₽</p>
          <button 
            onClick={() => toggleWishlist(product.id)}
            className={`mt-2 transition-colors ${isWishlisted ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
