import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { ApiResponse } from '@/types';

const request: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, message: msg } = response.data;
    if (code === 200) {
      return response.data;
    } else {
      message.error(msg || '请求失败');
      return Promise.reject(new Error(msg || '请求失败'));
    }
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      message.error('登录已过期，请重新登录');
      window.location.href = '/login';
    } else {
      message.error(error.message || '网络错误');
    }
    return Promise.reject(error);
  }
);

export default request;
