import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const login = useUserStore((state) => state.login);

  const from = (location.state as any)?.from?.pathname || '/';

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      // Mock login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      login(
        {
          id: 1,
          username: values.username,
          email: 'user@example.com',
          phone: '13800138000',
          status: 1,
        },
        'mock-token-12345'
      );
      
      message.success('登录成功');
      navigate(from, { replace: true });
    } catch (error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%)',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
            <Title level={2} style={{ color: '#52c41a', margin: 0 }}>
              EcoMarket
            </Title>
            <Text type="secondary">欢迎回来，请登录您的账户</Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: '100%', height: 48, background: '#52c41a' }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Text>
              还没有账户？ <Link to="/register">立即注册</Link>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
