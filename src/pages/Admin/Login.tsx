import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '@/stores/useAdminStore';
import adminService from '@/services/adminService';

const { Title, Text } = Typography;

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAdminStore((state) => state.login);
  const [form] = Form.useForm();

  const from = (location.state as any)?.from?.pathname || '/admin/users';

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      const res = await adminService.adminLogin(values);
      const token = res?.token || res; // 兼容两种可能的响应结构
      login(typeof token === 'string' ? token : token?.token, values.username);
      message.success('登录成功');
      navigate(from, { replace: true });
    } catch (error) {
      message.error('登录失败，请检查用户名和密码');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)',
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ color: '#722ED1', margin: 0 }}>
            微享管理后台
          </Title>
          <Text type="secondary">请登录管理后台</Text>
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ background: '#722ED1', borderColor: '#722ED1' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            返回<a href="/" style={{ color: '#722ED1' }}>商城首页</a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
