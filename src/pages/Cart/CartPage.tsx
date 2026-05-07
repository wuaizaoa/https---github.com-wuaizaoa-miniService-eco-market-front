import { useEffect, useState } from 'react';
import { Typography, Button, Card, List, InputNumber, Space, Empty, message, Row, Col } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/useCartStore';
import { useUserStore } from '@/stores/useUserStore';
import { formatPrice } from '@/utils/format';
import Loading from '@/components/Common/Loading';

const { Title, Text } = Typography;

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);
  const { items, totalCount, totalPrice, updateQuantity, removeItem, clearCart, fetchCart, loading } = useCartStore();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    setLocalLoading(true);
    try {
      await updateQuantity(productId, quantity);
    } catch (error) {
      message.error(error instanceof Error ? error.message : '更新数量失败');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    setLocalLoading(true);
    try {
      await removeItem(productId);
      message.success('已移除商品');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '移除商品失败');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleClearCart = async () => {
    setLocalLoading(true);
    try {
      await clearCart();
      message.success('购物车已清空');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '清空购物车失败');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      message.warning('购物车是空的');
      return;
    }
    navigate('/checkout');
  };

  if (loading || localLoading) {
    return <Loading />;
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Empty
          description="购物车是空的"
          image={<ShoppingCartOutlined style={{ fontSize: 64, color: '#52c41a' }} />}
        >
          <Button type="primary" style={{ background: '#52c41a' }} onClick={() => navigate('/')}>
            去购物
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>购物车</Title>

      <Row gutter={24}>
        <Col xs={24} md={16}>
          <List
            dataSource={items}
            renderItem={(item) => (
              <List.Item key={item.productId}>
                <Card style={{ width: '100%' }}>
                  <Row align="middle" gutter={16}>
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
                      <Space direction="vertical" size="small">
                        <Title level={4} style={{ margin: 0 }}>{item.productName}</Title>
                        <Text type="secondary">单价: {formatPrice(item.productPrice)}</Text>
                      </Space>
                    </Col>
                    <Col>
                      <Space>
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(value) => handleUpdateQuantity(item.productId, value || 1)}
                        />
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveItem(item.productId)}
                        />
                      </Space>
                    </Col>
                    <Col>
                      <Title level={4} style={{ color: '#52c41a', margin: 0 }}>
                        {formatPrice(item.productPrice * item.quantity)}
                      </Title>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        <Col xs={24} md={8}>
          <Card title="订单信息" style={{ position: 'sticky', top: 24 }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Row justify="space-between">
                <Text>商品数量：</Text>
                <Text strong>{totalCount} 件</Text>
              </Row>
              <Row justify="space-between">
                <Text>商品金额：</Text>
                <Text strong>{formatPrice(totalPrice)}</Text>
              </Row>
              <Row justify="space-between">
                <Text>运费：</Text>
                <Text>免运费</Text>
              </Row>
              <hr />
              <Row justify="space-between">
                <Title level={4} style={{ margin: 0 }}>总计：</Title>
                <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
                  {formatPrice(totalPrice)}
                </Title>
              </Row>
              <Button
                type="primary"
                size="large"
                style={{ width: '100%', background: '#52c41a' }}
                onClick={handleCheckout}
              >
                去结算
              </Button>
              <Button danger style={{ width: '100%' }} onClick={handleClearCart}>
                清空购物车
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default CartPage;
