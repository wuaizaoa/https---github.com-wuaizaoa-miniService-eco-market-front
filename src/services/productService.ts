import { api } from './api';
import type { Product, Category } from '@/types';

export interface ProductListParams {
  categoryId?: number;
  page?: number;
  pageSize?: number;
}

export const productService = {
  getProducts: (params?: ProductListParams) => api.get<Product[]>('/api/product/list', params),
  getProductDetail: (id: number) => api.get<Product>(`/api/product/${id}`),
  getCategories: () => api.get<Category[]>('/api/product/categories'),
};
