import { api } from './api';
import type { CartItem, Order } from '@/types';

export interface CreateOrderParams {
  address: string;
  payMethod: string;
}

export const orderService = {
  getCart: () => api.get<CartItem[]>('/api/order/cart'),
  addToCart: (productId: number, quantity: number) => api.post<void>('/api/order/cart', { productId, quantity }),
  updateCart: (productId: number, quantity: number) => api.put<void>(`/api/order/cart/${productId}`, { quantity }),
  removeFromCart: (productId: number) => api.delete<void>(`/api/order/cart/${productId}`),
  createOrder: (data: CreateOrderParams) => api.post<Order>('/api/order/create', data),
  getOrders: () => api.get<Order[]>('/api/order/list'),
  getOrderDetail: (id: number) => api.get<Order>(`/api/order/${id}`),
};
