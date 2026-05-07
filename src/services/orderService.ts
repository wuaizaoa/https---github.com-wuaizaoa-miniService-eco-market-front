import { api } from './api';
import type { CartItem, Order } from '@/types';

export interface CartItemCmd {
  userId: number;
  productId: number;
  quantity: number;
}

export interface CreateOrderCmd {
  userId: number;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

export const cartService = {
  getCart: (userId: number) => api.get<CartItem[]>(`/api/cart/${userId}`),
  addToCart: (data: CartItemCmd) => api.post<void>('/api/cart', data),
  updateCartItem: (data: CartItemCmd) => api.put<void>('/api/cart', data),
  removeFromCart: (userId: number, productId: number) => api.delete<void>(`/api/cart/${userId}/${productId}`),
  clearCart: (userId: number) => api.delete<void>(`/api/cart/${userId}`),
};

export const orderService = {
  createOrder: (data: CreateOrderCmd) => api.post<Order>('/api/order', data),
  getOrderDetail: (id: number) => api.get<Order>(`/api/order/${id}`),
  getOrdersByUserId: (userId: number) => api.get<Order[]>(`/api/order/user/${userId}`),
  updateOrderStatus: (orderId: number, status: number) => api.put<boolean>('/api/order/status', { orderId, status }),
};
