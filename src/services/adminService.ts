import { api } from './api';
import type { User, Product, Order, OrderItem } from '@/types';

// 管理员登录请求类型
export interface AdminLoginRequest {
  username: string;
  password: string;
}

// 管理员登录响应类型
export interface AdminLoginResponse {
  token: string;
}

export const adminService = {
  // 管理员登录
  adminLogin: (data: AdminLoginRequest) =&gt; 
    api.post&lt;AdminLoginResponse&gt;('/api/admin/login', data),

  // 用户管理
  getAllUsers: () =&gt; api.get&lt;User[]&gt;('/api/admin/users'),
  createUser: (data: Omit&lt;User, 'id' | 'createdAt' | 'updatedAt'&gt;) =&gt; 
    api.post&lt;User&gt;('/api/admin/users', data),
  updateUser: (id: number, data: Partial&lt;Omit&lt;User, 'id' | 'createdAt' | 'updatedAt'&gt;&gt;) =&gt; 
    api.put&lt;User&gt;(`/api/admin/users/${id}`, data),
  deleteUser: (id: number) =&gt; api.delete(`/api/admin/users/${id}`),

  // 商品管理
  getAllProducts: () =&gt; api.get&lt;Product[]&gt;('/api/admin/products'),
  createProduct: (data: Omit&lt;Product, 'id' | 'createdAt' | 'updatedAt'&gt;) =&gt; 
    api.post&lt;Product&gt;('/api/admin/products', data),
  updateProduct: (id: number, data: Partial&lt;Omit&lt;Product, 'id' | 'createdAt' | 'updatedAt'&gt;&gt;) =&gt; 
    api.put&lt;Product&gt;(`/api/admin/products/${id}`, data),
  deleteProduct: (id: number) =&gt; api.delete(`/api/admin/products/${id}`),

  // 订单管理
  getAllOrders: () =&gt; api.get&lt;Order[]&gt;('/api/admin/orders'),
  getOrderDetail: (id: number) =&gt; api.get&lt;Order &amp; { items: OrderItem[] }&gt;(`/api/admin/orders/${id}`),
  updateOrderStatus: (id: number, status: number) =&gt; 
    api.put(`/api/admin/orders/${id}/status`, { status }),
};

export default adminService;
