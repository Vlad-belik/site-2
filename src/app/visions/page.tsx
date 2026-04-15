"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Heart, MessageSquare, Loader2, X } from "lucide-react";
import { generatePsychVisionsCaptions } from "@/ai/flows/psych-visions-caption-generator";
import { useToast } from "@/hooks/use-toast";

export default function VisionsPage() {
  const { toast } = useToast();
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [aiCaptions, setAiCaptions] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const mockVisions = [
    { id: 1, user: "@void_runner", image: "https://picsum.photos/seed/v1/600/800", likes: 666, caption: "Shadows don't leave you in the psych realm." },
    { id: 2, user: "@skeleton_crew", image: "https://picsum.photos/seed/v2/600/800", likes: 404, caption: "Woven in the dark, worn in the light." },
    { id: 3, user: "@abyss_walker", image: "https://picsum.photos/seed/v3/600/800", likes: 13, caption: "My reflection is a stranger." },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCaptions = async () => {
    if (!uploadPreview) return;
    setIsAiLoading(true);
    try {
      const result = await generatePsychVisionsCaptions({
        photoDataUri: uploadPreview,
        description: "Streetwear outfit in urban environment"
      });
      setAiCaptions(result.captions);
      toast({ title: "Генерация завершена", description: "ИИ подобрал подходящие по духу описания" });
    } catch (error) {
      toast({ title: "Ошибка ИИ", description: "Не удалось связаться с бездной", variant: "destructive" });
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-10 md:mb-16 gap-4 md:gap-6">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase glitch-text leading-none">PSYCH<br/><span className="text-primary">VISIONS</span></h1>
        <p className="max-w-xl text-muted-foreground uppercase tracking-[0.2em] md:tracking-widest text-[9px] md:text-sm px-4 leading-relaxed">Галерея образов PSIH. Загружай свой лук, получай благословение ИИ и становись частью культа.</p>
        
        <div className="mt-4 md:mt-8 p-5 md:p-8 border border-border bg-muted/20 w-full max-w-2xl">
          <div className="flex flex-col items-center gap-6">
            {!uploadPreview ? (
              <label className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-2 border-dashed border-border hover:border-primary transition-all cursor-pointer group">
                <Camera className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="mt-4 text-[9px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white">Загрузить фото</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="w-full space-y-6">
                <div className="relative aspect-[3/4] max-w-[240px] md:max-w-sm mx-auto border border-primary overflow-hidden">
                  <Image src={uploadPreview} alt="Preview" fill className="object-cover grayscale" data-ai-hint="user upload" />
                  <button onClick={() => setUploadPreview(null)} className="absolute top-2 right-2 bg-black/80 text-white p-1 text-[10px] border border-white/20">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={generateCaptions} 
                    disabled={isAiLoading}
                    className="w-full bg-white text-black font-bold uppercase tracking-widest rounded-none h-11 md:h-12 text-[10px]"
                  >
                    {isAiLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "СГЕНЕРИРОВАТЬ ОПИСАНИЕ ИИ"}
                  </Button>
                  
                  {aiCaptions.length > 0 && (
                    <div className="p-4 bg-black/40 border border-primary/20 space-y-3 text-left">
                      <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Варианты от PSIH ИИ:</p>
                      {aiCaptions.map((c, i) => (
                        <div key={i} className="text-[11px] text-white italic py-2 border-b border-border/50 last:border-0 hover:text-primary cursor-pointer transition-colors leading-relaxed">
                          "{c}"
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button className="w-full bg-primary text-white font-bold uppercase tracking-widest rounded-none h-11 md:h-12 text-[10px]">
                    ОПУБЛИКОВАТЬ В БЕЗДНУ
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {mockVisions.map((v) => (
          <div key={v.id} className="border border-border bg-muted/10 overflow-hidden group">
            <div className="relative aspect-[3/4] border-b border-border">
              <Image src={v.image} alt={v.user} fill className="object-cover grayscale md:group-hover:grayscale-0 transition-all duration-700" data-ai-hint="user content" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-[9px] md:text-[10px] text-white font-bold">P</div>
                <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest bg-black/60 px-2 py-1">{v.user}</span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-[11px] md:text-xs text-white leading-relaxed italic">"{v.caption}"</p>
              <div className="flex justify-between items-center border-t border-border pt-4">
                <div className="flex gap-3 md:gap-4">
                  <button className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="h-3 w-3 md:h-4 md:w-4" /> {v.likes}
                  </button>
                  <button className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-muted-foreground hover:text-white transition-colors">
                    <MessageSquare className="h-3 w-3 md:h-4 md:w-4" /> 12
                  </button>
                </div>
                <button className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest">Share</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}