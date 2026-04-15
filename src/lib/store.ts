
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface PSIHState {
  cart: CartItem[];
  wishlist: string[]; // array of product IDs
  isPsychFilterActive: boolean;
  isPsychRealmActive: boolean;
  
  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  toggleWishlist: (productId: string) => void;
  togglePsychFilter: () => void;
  togglePsychRealm: () => void;
  clearCart: () => void;
}

export const usePSIHStore = create<PSIHState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      isPsychFilterActive: false,
      isPsychRealmActive: false,

      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.id === item.id && i.size === item.size);
        if (existing) {
          return {
            cart: state.cart.map(i => 
              (i.id === item.id && i.size === item.size) 
                ? { ...i, quantity: i.quantity + 1 } 
                : i
            )
          };
        }
        return { cart: [...state.cart, item] };
      }),

      removeFromCart: (id, size) => set((state) => ({
        cart: state.cart.filter(i => !(i.id === id && i.size === size))
      })),

      toggleWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.includes(productId)
          ? state.wishlist.filter(id => id !== productId)
          : [...state.wishlist, productId]
      })),

      togglePsychFilter: () => set((state) => ({ isPsychFilterActive: !state.isPsychFilterActive })),
      
      togglePsychRealm: () => set((state) => ({ isPsychRealmActive: !state.isPsychRealmActive })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'psih-storage-v3',
      partialize: (state) => ({ 
        cart: state.cart, 
        wishlist: state.wishlist,
        isPsychFilterActive: state.isPsychFilterActive 
      }),
    }
  )
);
