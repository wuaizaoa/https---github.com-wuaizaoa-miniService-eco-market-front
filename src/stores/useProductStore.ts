import { create } from 'zustand';
import { Product, Category } from '@/types';

interface ProductState {
  products: Product[];
  categories: Category[];
  currentProduct: Product | null;
  loading: boolean;
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setCurrentProduct: (product: Product | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  currentProduct: null,
  loading: false,
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setCurrentProduct: (product) => set({ currentProduct: product }),
  setLoading: (loading) => set({ loading }),
}));
