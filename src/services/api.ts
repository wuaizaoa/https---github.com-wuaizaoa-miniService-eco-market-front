import request from '@/utils/request';
import type { ApiResponse } from '@/types';

export const api = {
  get: <T = unknown>(url: string, params?: unknown) => request.get<T, ApiResponse<T>>(url, { params }),
  post: <T = unknown>(url: string, data?: unknown) => request.post<T, ApiResponse<T>>(url, data),
  put: <T = unknown>(url: string, data?: unknown) => request.put<T, ApiResponse<T>>(url, data),
  delete: <T = unknown>(url: string) => request.delete<T, ApiResponse<T>>(url),
};
