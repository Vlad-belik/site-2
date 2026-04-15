"use client";

import { usePSIHStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = usePSIHStore();
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal >= 10000 ? 0 : 500;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center gap-8">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-4">
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-white uppercase">Твоя корзина пуста</h1>
          <p className="text-muted-foreground uppercase tracking-widest">Беспорядок в голове, порядок в корзине</p>
        </div>
        <Link href="/shop">
          <Button className="bg-white text-black font-bold uppercase tracking-widest px-12 py-8 text-lg rounded-none hover:bg-primary hover:text-white transition-all">
            В КАТАЛОГ →
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-7xl font-bold tracking-tighter text-white uppercase glitch-text mb-12">КОРЗИНА</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-6 border-b border-border pb-6 items-center">
              <div className="relative w-24 aspect-[3/4] border border-border">
                <Image src={item.image} alt={item.name} fill className="object-cover grayscale" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-xl font-bold text-white tracking-tight">{item.name}</h3>
                  <p className="font-bold text-white">{(item.price * item.quantity).toLocaleString()} ₽</p>
                </div>
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>РАЗМЕР: {item.size}</span>
                  <span>КОЛ-ВО: {item.quantity}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="flex items-center gap-1 text-[10px] font-bold text-primary hover:text-white uppercase tracking-widest"
                >
                  <Trash2 className="h-3 w-3" /> Удалить
                </button>
              </div>
            </div>
          ))}
          
          <button 
            onClick={clearCart}
            className="text-[10px] font-bold text-muted-foreground hover:text-white uppercase tracking-widest transition-colors"
          >
            ОЧИСТИТЬ ВСЁ
          </button>
        </div>

        <div className="lg:col-span-4">
          <div className="p-8 border border-border bg-muted/5 space-y-8 sticky top-32">
            <h2 className="text-white font-headline text-2xl font-bold tracking-tight uppercase">ЗАКАЗ</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm uppercase font-bold text-muted-foreground">
                <span>СУММА</span>
                <span className="text-white">{subtotal.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm uppercase font-bold text-muted-foreground">
                <span>ДОСТАВКА</span>
                <span className="text-white">{shipping === 0 ? "БЕСПЛАТНО" : `${shipping} ₽`}</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between font-headline text-2xl font-bold text-primary">
                <span>ИТОГО</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
            </div>

            <Button className="w-full bg-primary text-white font-headline font-bold text-lg py-10 rounded-none uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black group">
              ОФОРМИТЬ ЗАКАЗ <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <div className="space-y-4 pt-4">
              <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">
                Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями оферты и политикой конфиденциальности бездны.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
