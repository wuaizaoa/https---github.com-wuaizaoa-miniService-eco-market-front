import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';
import type { ApiResponse } from '@/types';

const filterSensitiveData = (data: any): any => {
  if (!data) return data;
  
  if (typeof data === 'string') {
    return data;
  }
  
  if (typeof data === 'object') {
    const filtered = Array.isArray(data) ? [...data] : { ...data };
    
    for (const key in filtered) {
      if (typeof filtered[key] === 'string') {
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('password') || lowerKey.includes('token') || lowerKey.includes('secret')) {
          filtered[key] = '***';
        }
      } else if (typeof filtered[key] === 'object') {
        filtered[key] = filterSensitiveData(filtered[key]);
      }
    }
    
    return filtered;
  }
  
  return data;
};

const filterSensitiveHeaders = (headers: any): any => {
  if (!headers) return headers;
  
  const filtered = { ...headers };
  
  for (const key in filtered) {
    if (key.toLowerCase() === 'authorization') {
      const authValue = filtered[key];
      if (typeof authValue === 'string' && authValue.startsWith('Bearer ')) {
        const token = authValue.slice(7);
        filtered[key] = `Bearer ${token.slice(0, 4)}****`;
      } else {
        filtered[key] = '***';
      }
    }
  }
  
  return filtered;
};

const request: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isAdminRequest = config.url?.includes('/admin');

    if (isAdminRequest) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken && adminToken !== 'undefined' && config.headers) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else {
      const token = localStorage.getItem('token');
      if (token && token !== 'undefined' && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    const groupTitle = `🚀 REQUEST: ${config.method?.toUpperCase()} ${config.url}`;
    console.group(groupTitle);
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log('📍 URL:', config.url);
    console.log('📋 Method:', config.method?.toUpperCase());
    console.log('🔑 Headers:', filterSensitiveHeaders(config.headers));
    if (config.params) {
      console.log('📦 Params:', filterSensitiveData(config.params));
    }
    if (config.data) {
      console.log('📤 Body:', filterSensitiveData(config.data));
    }
    console.groupEnd();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const config = response.config;
    const groupTitle = `✅ RESPONSE: ${config.method?.toUpperCase()} ${config.url}`;
    console.group(groupTitle);
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log('📍 URL:', config.url);
    console.log('📋 Method:', config.method?.toUpperCase());
    console.log('📊 Status:', response.status);
    console.log('📥 Headers:', filterSensitiveHeaders(response.headers));
    console.log('📦 Data:', filterSensitiveData(response.data));
    console.groupEnd();
    
    const res = response.data;
    if (res.code === 200) {
      return res.data;
    } else {
      message.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
  },
  (error) => {
    const config = error.config;
    const groupTitle = `❌ ERROR: ${config?.method?.toUpperCase()} ${config?.url}`;
    console.group(groupTitle);
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log('📍 URL:', config?.url);
    console.log('📋 Method:', config?.method?.toUpperCase());
    if (error.response) {
      console.log('📊 Status:', error.response.status);
      console.log('📥 Headers:', filterSensitiveHeaders(error.response.headers));
      console.log('📦 Data:', filterSensitiveData(error.response.data));
    }
    console.log('❌ Error Message:', error.message);
    console.groupEnd();
    
    const isAdminRequest = config?.url?.startsWith('/api/admin');
    
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
