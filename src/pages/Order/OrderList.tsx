import { useState, useEffect } from 'react';
import { Typography, Button, Card, List, Tag, Space, Empty, message } from 'antd';
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/Common/Loading';
import type { Order } from '@/types';
import { useUserStore } from '@/stores/useUserStore';
import { orderService } from '@/services/orderService';
import { formatPrice, formatDate, getOrderStatusText } from '@/utils/format';

const { Title, Text } = Typography;

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await orderService.getOrdersByUserId(user.id);
      setOrders(response.data);
    } catch {
      message.error('加载订单失败');
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status: number) => {
    const colors = ['orange', 'blue', 'green', 'red', 'gray'];
    return <Tag color={colors[status] || 'gray'}>{getOrderStatusText(status)}</Tag>;
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
            <List.Item key={order.id}>
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
                      共 {order.orderItems?.length || 0} 件商品
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
