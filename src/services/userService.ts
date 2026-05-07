import { api } from './api';
import type { User, LoginResponse } from '@/types';

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  password: string;
  email?: string;
  phone?: string;
}

export const userService = {
  login: (data: LoginParams) => api.post<LoginResponse>('/api/user/login', data),
  register: (data: RegisterParams) => api.post<User>('/api/user/register', data),
  getUserById: (id: number) => api.get<User>(`/api/user/${id}`),
};
