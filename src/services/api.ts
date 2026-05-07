import request from '@/utils/request';
import { ApiResponse } from '@/types';

export const api = {
  get: <T = any>(url: string, params?: any) => request.get<T, ApiResponse<T>>(url, { params }),
  post: <T = any>(url: string, data?: any) => request.post<T, ApiResponse<T>>(url, data),
  put: <T = any>(url: string, data?: any) => request.put<T, ApiResponse<T>>(url, data),
  delete: <T = any>(url: string) => request.delete<T, ApiResponse<T>>(url),
};
