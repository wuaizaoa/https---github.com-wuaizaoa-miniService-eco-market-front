import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';
import { cartService } from '@/services/orderService';
import { useUserStore } from '@/stores/useUserStore';

interface CartState {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  loading: boolean;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalCount: 0,
      totalPrice: 0,
      loading: false,
      
      setItems: (items) => {
        const { totalCount, totalPrice } = calculateTotalsFromItems(items);
        set({ items, totalCount, totalPrice });
      },
      
      fetchCart: async () => {
        const user = useUserStore.getState().user;
        if (!user) {
          return;
        }
        set({ loading: true });
        try {
          const response = await cartService.getCart(user.id);
          const cartItems = response || [];
          const { totalCount, totalPrice } = calculateTotalsFromItems(cartItems);
          set({ items: cartItems, totalCount, totalPrice });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        } finally {
          set({ loading: false });
        }
      },
      
      addItem: async (item) => {
        const user = useUserStore.getState().user;
        if (!user) {
          throw new Error('请先登录');
        }
        set({ loading: true });
        try {
          await cartService.addToCart({
            userId: user.id,
            productId: item.productId,
            quantity: item.quantity,
          });
          // 重新获取购物车数据
          await get().fetchCart();
        } finally {
          set({ loading: false });
        }
      },
      
      updateQuantity: async (productId, quantity) => {
        const user = useUserStore.getState().user;
        if (!user) {
          throw new Error('请先登录');
        }
        set({ loading: true });
        try {
          await cartService.updateCartItem({
            userId: user.id,
            productId,
            quantity,
          });
          // 重新获取购物车数据
          await get().fetchCart();
        } finally {
          set({ loading: false });
        }
      },
      
      removeItem: async (productId) => {
        const user = useUserStore.getState().user;
        if (!user) {
          throw new Error('请先登录');
        }
        set({ loading: true });
        try {
          await cartService.removeFromCart(user.id, productId);
          // 重新获取购物车数据
          await get().fetchCart();
        } finally {
          set({ loading: false });
        }
      },
      
      clearCart: async () => {
        const user = useUserStore.getState().user;
        if (!user) {
          return;
        }
        set({ loading: true });
        try {
          await cartService.clearCart(user.id);
          set({ items: [], totalCount: 0, totalPrice: 0 });
        } finally {
          set({ loading: false });
        }
      },
      
      calculateTotals: () => {
        const { items } = get();
        const { totalCount, totalPrice } = calculateTotalsFromItems(items);
        set({ totalCount, totalPrice });
      },
    }),
    { 
      name: 'cart-storage',
      partialize: () => ({
        // 只在persist中保存非敏感数据
        // 购物车数据从后端获取，不持久化
      }),
    }
  )
);

function calculateTotalsFromItems(items: CartItem[]) {
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  return { totalCount, totalPrice };
}
