import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';
import type { ApiResponse } from '@/types';

const request: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) =&gt; {
    const isAdminRequest = config.url?.startsWith('/api/admin');
    
    if (isAdminRequest) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken &amp;&amp; config.headers) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else {
      const token = localStorage.getItem('token');
      if (token &amp;&amp; config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) =&gt; {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: AxiosResponse&lt;ApiResponse&gt;) =&gt; {
    const res = response.data;
    if (res.code === 200) {
      return { ...response, data: res.data };
    } else {
      message.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
  },
  (error) =&gt; {
    const isAdminRequest = error.config?.url?.startsWith('/api/admin');
    
    if (error.response?.status === 401) {
      if (isAdminRequest) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        message.error('管理员登录已过期，请重新登录');
        window.location.href = '/admin/login';
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        message.error('登录已过期，请重新登录');
        window.location.href = '/login';
      }
    } else {
      message.error(error.message || '网络错误');
    }
    return Promise.reject(error);
  }
);

export default request;
