import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Card, List, Tag, Space, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Loading from '@/components/Common/Loading';
import type { Order } from '@/types';
import { formatPrice, formatDate, getOrderStatusText } from '@/utils/format';

const { Title, Text } = Typography;

// Mock order detail
const getMockOrder = (id: string): Order => ({
  id: parseInt(id),
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
});

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (id) {
        setOrder(getMockOrder(id));
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const getStatusTag = (status: number) => {
    const colors = ['orange', 'blue', 'green', 'red'];
    return <Tag color={colors[status]}>{getOrderStatusText(status)}</Tag>;
  };

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return <div>订单不存在</div>;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/user/orders')}>
          返回
        </Button>
        <Title level={2} style={{ margin: 0 }}>订单详情</Title>
      </Space>

      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Text strong>订单号：{order.orderNo}</Text>
              {getStatusTag(order.status)}
            </Space>
            <Text type="secondary">下单时间：{order.createdAt ? formatDate(order.createdAt) : '-'}</Text>
          </div>
        </Space>
      </Card>

      <Card title="商品清单">
        <List
          dataSource={order.items}
          renderItem={(item) => (
            <List.Item>
              <Row align="middle" gutter={16} style={{ width: '100%' }}>
                <Col>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%)',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 32,
                    }}
                  >
                    🌱
                  </div>
                </Col>
                <Col flex="auto">
                  <Text strong style={{ fontSize: 16 }}>{item.productName}</Text>
                  <br />
                  <Text type="secondary">单价：{formatPrice(item.productPrice)}</Text>
                </Col>
                <Col>
                  <Text type="secondary">x {item.quantity}</Text>
                </Col>
                <Col>
                  <Text strong style={{ fontSize: 16 }}>
                    {formatPrice(item.productPrice * item.quantity)}
                  </Text>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>

      <Card title="订单金额">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Row justify="space-between">
            <Text>商品金额：</Text>
            <Text>{formatPrice(order.totalAmount)}</Text>
          </Row>
          <Row justify="space-between">
            <Text>运费：</Text>
            <Text>免运费</Text>
          </Row>
          <hr />
          <Row justify="space-between">
            <Title level={4} style={{ margin: 0 }}>实付金额：</Title>
            <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
              {formatPrice(order.totalAmount)}
            </Title>
          </Row>
        </Space>
      </Card>
    </Space>
  );
};

export default OrderDetail;
