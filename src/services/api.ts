import request from '@/utils/request';

export const api = {
  get: <T = unknown>(url: string, params?: unknown) => request.get<T>(url, { params }),
  post: <T = unknown>(url: string, data?: unknown) => request.post<T>(url, data),
  put: <T = unknown>(url: string, data?: unknown) => request.put<T>(url, data),
  delete: <T = unknown>(url: string) => request.delete<T>(url),
};
