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

  getAllUsers: () => api.get<User[]>('/api/user/admin/list'),
  createUser: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => api.post<User>('/api/user/admin', data),
  updateUser: (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) => api.put<User>(`/api/user/admin/${id}`, data),
  deleteUser: (id: number) => api.delete(`/api/user/admin/${id}`),

  getAllProducts: () => api.get<Product[]>('/api/product/admin/list'),
  createProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => api.post<Product>('/api/product/admin', data),
  updateProduct: (id: number, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => api.put<Product>(`/api/product/admin/${id}`, data),
  deleteProduct: (id: number) => api.delete(`/api/product/admin/${id}`),

  getAllOrders: () => api.get<Order[]>('/api/order/admin/list'),
  getOrderDetail: (id: number) => api.get<Order & { items: OrderItem[] }>(`/api/order/admin/${id}`),
  updateOrderStatus: (id: number, status: number) => api.put(`/api/order/admin/${id}/status`, { status }),
};

export default adminService;
