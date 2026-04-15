
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black py-16 text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="relative h-20 w-56 mb-8">
              <Image 
                src="/my-image.png" 
                alt="PSIH Logo" 
                fill 
                className="object-contain grayscale brightness-200"
              />
            </div>
            <p className="max-w-md text-sm leading-relaxed mb-8">
              Российский андеграунд бренд одежды. Мы создаем кошмары, которые можно носить. 
              Каждое изделие — это манифест твоего внутреннего безумия.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-white hover:text-primary text-sm uppercase tracking-widest">Instagram</Link>
              <Link href="#" className="text-white hover:text-primary text-sm uppercase tracking-widest">VKontakte</Link>
              <Link href="#" className="text-white hover:text-primary text-sm uppercase tracking-widest">Telegram</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-headline text-sm uppercase tracking-[0.2em] mb-6">Инфо</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Доставка</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Возврат</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Размерная сетка</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-headline text-sm uppercase tracking-[0.2em] mb-6">Подписка</h3>
            <p className="text-sm mb-4">Получай уведомления о новых дропах прямо в свою бездну.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="EMAIL" 
                className="flex-1 bg-muted border border-border px-4 py-2 text-xs focus:outline-none focus:border-primary transition-colors text-white"
              />
              <button className="bg-white text-black font-bold text-xs px-4 py-2 hover:bg-primary hover:text-white transition-all uppercase">
                OK
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest">
          <p>© 2026 PSIH FOR YOUR SKELETON</p>
          <div className="flex gap-6">
            <span>Сделано в бездне</span>
            <span>Политика конфиденциальности</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
