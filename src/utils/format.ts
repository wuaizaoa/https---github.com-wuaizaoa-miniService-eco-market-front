export const formatPrice = (price: number): string => {
  return `¥${price.toFixed(2)}`;
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getOrderStatusText = (status: number): string => {
  const statusMap: Record<number, string> = {
    0: '待支付',
    1: '已支付',
    2: '已发货',
    3: '已收货',
    4: '已取消',
  };
  return statusMap[status] || '未知';
};

export const getPaymentStatusText = (status: number): string => {
  return status === 0 ? '待支付' : '已支付';
};
