import { api } from './api';
import type { Product, Category } from '@/types';

export const productService = {
  getAllProducts: () => api.get<Product[]>('/api/product'),
  getProductsByCategory: (categoryId: number) => api.get<Product[]>(`/api/product/by-category/${categoryId}`),
  getProductDetail: (id: number) => api.get<Product>(`/api/product/${id}`),
  getAllCategories: () => api.get<Category[]>('/api/product/category'),
  getCategoryById: (id: number) => api.get<Category>(`/api/product/category/${id}`),
  getStock: (id: number) => api.get<number>(`/api/product/${id}/stock`),
};
