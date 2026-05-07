import { useState, useEffect } from 'react';
import { Typography, Button, Card, List, Tag, Space, Empty } from 'antd';
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/Common/Loading';
import type { Order } from '@/types';
import { formatPrice, formatDate, getOrderStatusText } from '@/utils/format';

const { Title, Text } = Typography;

// Mock orders
const mockOrders: Order[] = [
  {
    id: 1,
    orderNo: 'EC202401010001',
    userId: 1,
    totalAmount: 128.00,
    status: 2,
    payTime: '2024-01-01 10:30:00',
    createdAt: '2024-01-01 10:00:00',
    items: [
      {
        id: 1,
        orderId: 1,
        productId: 1,
        productName: '有机蔬菜礼盒',
        productPrice: 128.00,
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    orderNo: 'EC202401020002',
    userId: 1,
    totalAmount: 39.90,
    status: 1,
    payTime: '2024-01-02 14:20:00',
    createdAt: '2024-01-02 14:00:00',
    items: [
      {
        id: 2,
        orderId: 2,
        productId: 2,
        productName: '环保竹纤维毛巾',
        productPrice: 39.90,
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    orderNo: 'EC202401030003',
    userId: 1,
    totalAmount: 0,
    status: 3,
    createdAt: '2024-01-03 09:00:00',
    items: [],
  },
];

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusTag = (status: number) => {
    const colors = ['orange', 'blue', 'green', 'red'];
    return <Tag color={colors[status]}>{getOrderStatusText(status)}</Tag>;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/user')}>
          返回
        </Button>
        <Title level={2} style={{ margin: 0 }}>我的订单</Title>
      </Space>

      {orders.length === 0 ? (
        <Empty description="暂无订单" />
      ) : (
        <List
          dataSource={orders}
          renderItem={(order) => (
            <List.Item>
              <Card
                style={{ width: '100%' }}
                actions={[
                  <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => navigate(`/user/orders/${order.id}`)}
                  >
                    查看详情
                  </Button>,
                ]}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                      <Text type="secondary">订单号：{order.orderNo}</Text>
                      {getStatusTag(order.status)}
                    </Space>
                    <Text type="secondary">{order.createdAt ? formatDate(order.createdAt) : '-'}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>
                      共 {order.items?.length || 0} 件商品
                    </Text>
                    <Title level={4} style={{ color: '#52c41a', margin: 0 }}>
                      {formatPrice(order.totalAmount)}
                    </Title>
                  </div>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      )}
    </Space>
  );
};

export default OrderList;
