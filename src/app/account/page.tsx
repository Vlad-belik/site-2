
"use client";

import { usePSIHStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Heart, Package, User as UserIcon, Settings, LogOut, ArrowRight } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { user, wishlist, setUser } = usePSIHStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    toast({ title: "Выход выполнен", description: "Возвращайся скорее" });
  };

  if (!user) return null;

  // Mock data for display
  const orders = [
    { id: "ORD-666", date: "12.02.2024", total: "15,540 ₽", status: "В ПУТИ" },
    { id: "ORD-777", date: "01.01.2024", total: "3,330 ₽", status: "ДОСТАВЛЕНО" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Profile Sidebar */}
        <aside className="w-full md:w-80 space-y-8 sticky top-32">
          <div className="flex items-center gap-4 p-6 border border-border bg-muted/5">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-3xl font-headline font-bold text-white overflow-hidden">
              {user.photoURL ? (
                <Image src={user.photoURL} alt="Avatar" width={64} height={64} />
              ) : (
                user.email?.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h3 className="text-white font-headline text-lg font-bold tracking-tight uppercase truncate max-w-[150px]">
                {user.displayName || user.email?.split('@')[0]}
              </h3>
              <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase truncate max-w-[150px]">
                {user.email}
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start font-bold uppercase tracking-widest text-[11px] rounded-none h-12 hover:bg-muted/10">
              <UserIcon className="h-4 w-4 mr-3 text-primary" /> ПРОФИЛЬ
            </Button>
            <Button variant="ghost" className="justify-start font-bold uppercase tracking-widest text-[11px] rounded-none h-12 hover:bg-muted/10">
              <Settings className="h-4 w-4 mr-3 text-primary" /> НАСТРОЙКИ
            </Button>
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              className="justify-start font-bold uppercase tracking-widest text-[11px] rounded-none h-12 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-3" /> ВЫЙТИ
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-12">
          <h1 className="font-headline text-6xl font-bold tracking-tighter text-white uppercase glitch-text">ЛИЧНЫЙ КАБИНЕТ</h1>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 mb-8 gap-8">
              <TabsTrigger 
                value="orders" 
                className="bg-transparent text-muted-foreground data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none uppercase font-bold tracking-[0.2em] text-[11px] px-0 py-4 h-full"
              >
                ЗАКАЗЫ
              </TabsTrigger>
              <TabsTrigger 
                value="wishlist" 
                className="bg-transparent text-muted-foreground data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none uppercase font-bold tracking-[0.2em] text-[11px] px-0 py-4 h-full"
              >
                ИЗБРАННОЕ ({wishlist.length})
              </TabsTrigger>
              <TabsTrigger 
                value="outfits" 
                className="bg-transparent text-muted-foreground data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none uppercase font-bold tracking-[0.2em] text-[11px] px-0 py-4 h-full"
              >
                ОБРАЗЫ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-6">
              {orders.length > 0 ? (
                orders.map(order => (
                  <div key={order.id} className="p-6 border border-border bg-muted/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex gap-6 items-center">
                      <div className="p-4 bg-black border border-border">
                        <Package className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-white font-headline text-lg font-bold tracking-tight">{order.id}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col sm:items-end gap-2">
                      <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 uppercase tracking-widest border border-primary/30">
                        {order.status}
                      </span>
                      <p className="text-white font-bold">{order.total}</p>
                    </div>
                    <Button variant="outline" className="rounded-none border-border font-bold uppercase tracking-widest text-[10px]">ДЕТАЛИ</Button>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center space-y-4">
                  <p className="text-muted-foreground uppercase tracking-widest font-bold">У тебя пока нет заказов</p>
                  <Link href="/shop">
                    <Button className="bg-white text-black font-bold uppercase tracking-widest rounded-none">В КАТАЛОГ</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="wishlist">
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Mock logic for display wishlist items */}
                  {wishlist.map(id => (
                    <div key={id} className="group border border-border p-4 bg-muted/5">
                      <div className="relative aspect-[3/4] border border-border mb-4 overflow-hidden">
                        <Image 
                          src={`https://picsum.photos/seed/${id}/600/800`} 
                          alt="Product" 
                          fill 
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <h4 className="text-white font-headline font-bold uppercase">ТОВАР #{id}</h4>
                      <Link href={`/product/${id}`}>
                        <Button variant="link" className="text-primary p-0 h-auto font-bold uppercase tracking-widest text-[10px] mt-2">КУПИТЬ <ArrowRight className="h-3 w-3 ml-2"/></Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
                  <p className="text-muted-foreground uppercase tracking-widest font-bold">Список желаний пуст</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="outfits">
              <div className="py-20 text-center space-y-4">
                <p className="text-muted-foreground uppercase tracking-widest font-bold">Сохраненные образы будут здесь</p>
                <Link href="/builder">
                  <Button className="bg-primary text-white font-bold uppercase tracking-widest rounded-none">СОЗДАТЬ ОБРАЗ</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
