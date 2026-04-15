
"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut 
} from "firebase/auth";
import { usePSIHStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut, Chrome } from "lucide-react";

export function AuthModal() {
  const { user, setUser } = usePSIHStore();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        setUser({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        });
        toast({ title: "Вход выполнен", description: "Добро пожаловать в PSIH" });
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        setUser({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        });
        toast({ title: "Регистрация успешна", description: "Ваш аккаунт в бездне создан" });
      }
      setIsOpen(false);
    } catch (error: any) {
      toast({ 
        title: "Ошибка", 
        description: error.message || "Что-то пошло не так", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      setUser({
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      });
      toast({ title: "Вход через Google", description: "Добро пожаловать" });
      setIsOpen(false);
    } catch (error: any) {
      toast({ title: "Ошибка Google", description: error.message, variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    toast({ title: "Выход", description: "До встречи в кошмарах" });
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:text-primary transition-colors"
          onClick={() => window.location.href = '/account'}
        >
          <User className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black border border-border text-white sm:max-w-[400px] p-8">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl font-bold tracking-tighter uppercase glitch-text">
            {isLogin ? "ВХОД В БЕЗДНУ" : "ПРИМКНУТЬ К КУЛЬТУ"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground uppercase text-[10px] tracking-widest pt-2">
            {isLogin ? "Твой скелет ждет обновления" : "Создай свой профиль PSIH"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAuth} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">EMAIL</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted/20 border-border rounded-none focus:border-primary transition-colors text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pass" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">ПАРОЛЬ</Label>
            <Input 
              id="pass" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted/20 border-border rounded-none focus:border-primary transition-colors text-white"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-bold uppercase tracking-widest rounded-none h-12 hover:bg-primary hover:text-white transition-all"
          >
            {loading ? "ЗАГРУЗКА..." : isLogin ? "ВОЙТИ" : "РЕГИСТРАЦИЯ"}
          </Button>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-[10px] text-muted-foreground uppercase font-bold">ИЛИ</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <Button 
            type="button" 
            variant="outline"
            onClick={handleGoogleAuth}
            className="w-full border-border text-white font-bold uppercase tracking-widest rounded-none h-12 hover:bg-white hover:text-black"
          >
            <Chrome className="h-4 w-4 mr-2" /> GOOGLE
          </Button>

          <p className="text-center text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            {isLogin ? "Нет аккаунта?" : "Уже с нами?"}{" "}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-white underline underline-offset-4"
            >
              {isLogin ? "РЕГИСТРАЦИЯ" : "ВОЙТИ"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
