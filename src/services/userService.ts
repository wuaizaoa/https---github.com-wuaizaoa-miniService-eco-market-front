import { api } from './api';
import { User, ApiResponse } from '@/types';

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

export interface LoginResponse {
  token: string;
  user: User;
}

export const userService = {
  login: (data: LoginParams) => api.post<LoginResponse>('/api/user/login', data),
  register: (data: RegisterParams) => api.post<void>('/api/user/register', data),
  getUserInfo: () => api.get<User>('/api/user/info'),
};
