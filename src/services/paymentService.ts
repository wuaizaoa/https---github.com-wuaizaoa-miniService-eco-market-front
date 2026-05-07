import { api } from './api';
import type { Payment } from '@/types';

export interface PayParams {
  orderId: number;
  payMethod: string;
}

export const paymentService = {
  pay: (data: PayParams) => api.post<Payment>('/api/payment/pay', data),
};
