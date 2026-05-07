export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface User {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  parentId?: number;
  sort?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId?: number;
  image?: string;
  status: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  image?: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  createdAt?: string;
}

export interface Order {
  id: number;
  orderNo: string;
  userId: number;
  totalAmount: number;
  status: number;
  payTime?: string;
  createdAt?: string;
  updatedAt?: string;
  items?: OrderItem[];
}

export interface Payment {
  id: number;
  orderId: number;
  orderNo: string;
  userId: number;
  amount: number;
  payMethod?: string;
  status: number;
  thirdPartyNo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type OrderStatus = 0 | 1 | 2 | 3;
export type PaymentStatus = 0 | 1;
