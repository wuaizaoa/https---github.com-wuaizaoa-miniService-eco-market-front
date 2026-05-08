import { api } from './api';
import type { User, Product, Order, OrderItem } from '@/types';

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
}

export const adminService = {
  adminLogin: (data: AdminLoginRequest) => api.post<AdminLoginResponse>('/api/admin/login', data),

  getAllUsers: () => api.get<User[]>('/api/admin/users'),
  createUser: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => api.post<User>('/api/admin/users', data),
  updateUser: (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) => api.put<User>(`/api/admin/users/${id}`, data),
  deleteUser: (id: number) => api.delete(`/api/admin/users/${id}`),

  getAllProducts: () => api.get<Product[]>('/api/admin/products'),
  createProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => api.post<Product>('/api/admin/products', data),
  updateProduct: (id: number, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => api.put<Product>(`/api/admin/products/${id}`, data),
  deleteProduct: (id: number) => api.delete(`/api/admin/products/${id}`),

  getAllOrders: () => api.get<Order[]>('/api/admin/orders'),
  getOrderDetail: (id: number) => api.get<Order & { items: OrderItem[] }>(`/api/admin/orders/${id}`),
  updateOrderStatus: (id: number, status: number) => api.put(`/api/admin/orders/${id}/status`, { status }),
};

export default adminService;
