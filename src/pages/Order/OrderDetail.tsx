import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Card, List, Tag, Space, Row, Col, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Loading from '@/components/Common/Loading';
import type { Order } from '@/types';
import { orderService } from '@/services/orderService';
import { formatPrice, formatDate, getOrderStatusText } from '@/utils/format';

const { Title, Text } = Typography;

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      fetchOrder(parseInt(id));
    }
  }, [id]);

  const fetchOrder = async (orderId: number) => {
    setLoading(true);
    try {
      const response = await orderService.getOrderDetail(orderId);
      setOrder(response || null);
    } catch {
      message.error('加载订单详情失败');
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

  if (!order) {
    return <div>订单不存在</div>;
  }

  const orderItems = order.orderItems || [];

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
          dataSource={orderItems}
          renderItem={(item) => (
            <List.Item key={item.id}>
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
