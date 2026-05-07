import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalCount: 0,
      totalPrice: 0,
      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.productId === item.productId);
          let newItems;
          if (existingIndex !== -1) {
            newItems = [...state.items];
            newItems[existingIndex].quantity += item.quantity;
          } else {
            newItems = [...state.items, item];
          }
          const { totalCount, totalPrice } = calculateTotalsFromItems(newItems);
          return { items: newItems, totalCount, totalPrice };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          );
          const { totalCount, totalPrice } = calculateTotalsFromItems(newItems);
          return { items: newItems, totalCount, totalPrice };
        }),
      removeItem: (productId) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.productId !== productId);
          const { totalCount, totalPrice } = calculateTotalsFromItems(newItems);
          return { items: newItems, totalCount, totalPrice };
        }),
      clearCart: () => set({ items: [], totalCount: 0, totalPrice: 0 }),
      calculateTotals: () => {
        const { items } = get();
        const { totalCount, totalPrice } = calculateTotalsFromItems(items);
        set({ totalCount, totalPrice });
      },
    }),
    { name: 'cart-storage' }
  )
);

function calculateTotalsFromItems(items: CartItem[]) {
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  return { totalCount, totalPrice };
}
