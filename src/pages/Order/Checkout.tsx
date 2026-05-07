import { useState } from 'react';
import { Typography, Button, Card, List, Space, Row, Col, Form, Input, Radio, message } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/useCartStore';
import { formatPrice } from '@/utils/format';

const { Title, Text } = Typography;


const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { items, totalPrice, clearCart } = useCartStore();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Mock create order
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep(1);
      clearCart();
      message.success('订单创建成功');
    } catch {
      message.error('创建订单失败');
    } finally {
      setLoading(false);
    }
  };

  if (currentStep === 1) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <CheckCircleOutlined style={{ fontSize: 80, color: '#52c41a', marginBottom: 24 }} />
        <Title level={2}>订单提交成功！</Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          感谢您的购买，我们会尽快为您发货
        </Text>
        <Space style={{ marginTop: 32 }}>
          <Button type="primary" style={{ background: '#52c41a' }} onClick={() => navigate('/user/orders')}>
            查看订单
          </Button>
          <Button onClick={() => navigate('/')}>
            继续购物
          </Button>
        </Space>
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/cart')}>
        返回购物车
      </Button>

      <Title level={2}>确认订单</Title>

      <Row gutter={24}>
        <Col xs={24} md={16}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="收货地址">
              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label="收货人姓名"
                      rules={[{ required: true, message: '请输入收货人姓名' }]}
                    >
                      <Input placeholder="请输入收货人姓名" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="phone"
                      label="手机号码"
                      rules={[{ required: true, message: '请输入手机号码' }]}
                    >
                      <Input placeholder="请输入手机号码" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="address"
                  label="详细地址"
                  rules={[{ required: true, message: '请输入详细地址' }]}
                >
                  <Input.TextArea placeholder="请输入详细地址" rows={3} />
                </Form.Item>
              </Form>
            </Card>

            <Card title="商品清单">
              <List
                dataSource={items}
                renderItem={(item) => (
                  <List.Item>
                    <Row align="middle" gutter={16} style={{ width: '100%' }}>
                      <Col>
                        <div
                          style={{
                            width: 60,
                            height: 60,
                            background: 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%)',
                            borderRadius: 8,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                          }}
                        >
                          🌱
                        </div>
                      </Col>
                      <Col flex="auto">
                        <Text strong>{item.productName}</Text>
                        <br />
                        <Text type="secondary">x {item.quantity}</Text>
                      </Col>
                      <Col>
                        <Text strong>{formatPrice(item.productPrice * item.quantity)}</Text>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>

            <Card title="支付方式">
              <Form form={form} layout="vertical">
                <Form.Item
                  name="payMethod"
                  initialValue="alipay"
                  rules={[{ required: true, message: '请选择支付方式' }]}
                >
                  <Radio.Group>
                    <Radio value="alipay">支付宝</Radio>
                    <Radio value="wechat">微信支付</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </Col>

        <Col xs={24} md={8}>
          <Card title="订单信息" style={{ position: 'sticky', top: 24 }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Row justify="space-between">
                <Text>商品数量：</Text>
                <Text>{items.reduce((sum, item) => sum + item.quantity, 0)} 件</Text>
              </Row>
              <Row justify="space-between">
                <Text>商品金额：</Text>
                <Text>{formatPrice(totalPrice)}</Text>
              </Row>
              <Row justify="space-between">
                <Text>运费：</Text>
                <Text>免运费</Text>
              </Row>
              <hr />
              <Row justify="space-between">
                <Title level={4} style={{ margin: 0 }}>实付金额：</Title>
                <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
                  {formatPrice(totalPrice)}
                </Title>
              </Row>
              <Button
                type="primary"
                size="large"
                style={{ width: '100%', background: '#52c41a' }}
                loading={loading}
                onClick={() => form.validateFields().then(handleSubmit)}
              >
                提交订单
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default Checkout;
