
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit3, Save, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState([
    { id: '1', name: 'HOODIE "VOID"', price: 6660, category: 'ХУДИ' },
    { id: '2', name: 'TEE "SKULL"', price: 3330, category: 'ФУТБОЛКИ' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "ХУДИ",
    description: "",
    sizes: "S, M, L, XL"
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (products.length + 1).toString();
    setProducts([...products, { ...newProduct, id, price: Number(newProduct.price) }]);
    setIsEditing(false);
    toast({ title: "Успех", description: "Товар добавлен в каталог" });
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({ title: "Удалено", description: "Товар стерт из бездны" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-6xl font-bold tracking-tighter text-white uppercase glitch-text">УПРАВЛЕНИЕ</h1>
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            className="bg-primary text-white font-bold uppercase tracking-widest rounded-none h-12"
          >
            <Plus className="h-4 w-4 mr-2" /> НОВЫЙ ТОВАР
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* List Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 border border-border bg-muted/5 overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-border">
                <tr className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">
                  <th className="py-4">ID</th>
                  <th className="py-4">НАЗВАНИЕ</th>
                  <th className="py-4">КАТЕГОРИЯ</th>
                  <th className="py-4">ЦЕНА</th>
                  <th className="py-4 text-right">ДЕЙСТВИЯ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((p) => (
                  <tr key={p.id} className="text-xs text-white font-bold group">
                    <td className="py-4 text-muted-foreground">#{p.id}</td>
                    <td className="py-4">{p.name}</td>
                    <td className="py-4 text-primary">{p.category}</td>
                    <td className="py-4">{p.price.toLocaleString()} ₽</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white"><Edit3 className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteProduct(p.id)} className="h-8 w-8 hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Sidebar */}
        <div className="lg:col-span-4">
          {isEditing ? (
            <div className="p-8 border border-primary bg-muted/5 space-y-8 sticky top-32">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-headline text-xl font-bold uppercase tracking-tight">ДОБАВИТЬ ТОВАР</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}><X className="h-5 w-5"/></Button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">НАЗВАНИЕ</Label>
                  <Input 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="bg-muted/20 border-border rounded-none" 
                    placeholder="HOODIE 'VOID'"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">ЦЕНА (₽)</Label>
                  <Input 
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="bg-muted/20 border-border rounded-none" 
                    placeholder="6660"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">КАТЕГОРИЯ</Label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full h-10 bg-muted/20 border border-border rounded-none text-white px-3 text-xs"
                  >
                    <option value="ХУДИ">ХУДИ</option>
                    <option value="ФУТБОЛКИ">ФУТБОЛКИ</option>
                    <option value="БРЮКИ">БРЮКИ</option>
                    <option value="АКСЕССУАРЫ">АКСЕССУАРЫ</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">ОПИСАНИЕ</Label>
                  <Textarea 
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="bg-muted/20 border-border rounded-none min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">РАЗМЕРЫ (через запятую)</Label>
                  <Input 
                    value={newProduct.sizes}
                    onChange={(e) => setNewProduct({...newProduct, sizes: e.target.value})}
                    className="bg-muted/20 border-border rounded-none"
                  />
                </div>
                
                <div className="border-2 border-dashed border-border p-8 text-center space-y-4 hover:border-primary transition-colors cursor-pointer group">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto group-hover:text-primary transition-colors" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">ЗАГРУЗИТЬ ФОТО</p>
                </div>

                <Button type="submit" className="w-full bg-primary text-white font-bold uppercase tracking-widest rounded-none h-14">
                  <Save className="h-4 w-4 mr-2" /> СОХРАНИТЬ В БАЗУ
                </Button>
              </form>
            </div>
          ) : (
            <div className="p-12 border border-border border-dashed bg-muted/5 text-center space-y-6">
              <h3 className="text-muted-foreground font-headline text-sm uppercase tracking-[0.3em]">ВЫБЕРИТЕ ТОВАР ДЛЯ РЕДАКТИРОВАНИЯ ИЛИ СОЗДАЙТЕ НОВЫЙ</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
