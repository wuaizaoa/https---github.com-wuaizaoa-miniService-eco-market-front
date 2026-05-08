import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '@/stores/useAdminStore';
import adminService from '@/services/adminService';

const { Title, Text } = Typography;

const AdminLogin: React.FC = () =&gt; {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAdminStore((state) =&gt; state.login);
  const [form] = Form.useForm();

  const from = (location.state as any)?.from?.pathname || '/admin/users';

  const handleSubmit = async (values: { username: string; password: string }) =&gt; {
    try {
      const res = await adminService.adminLogin(values);
      login(res.token, values.username);
      message.success('登录成功');
      navigate(from, { replace: true });
    } catch (error) {
      message.error('登录失败，请检查用户名和密码');
    }
  };

  return (
    &lt;div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)',
      }}
    &gt;
      &lt;Card
        style={{
          width: 400,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      &gt;
        &lt;div style={{ textAlign: 'center', marginBottom: 24 }}&gt;
          &lt;Title level={3} style={{ color: '#722ED1', margin: 0 }}&gt;
            微享管理后台
          &lt;/Title&gt;
          &lt;Text type="secondary"&gt;请登录管理后台&lt;/Text&gt;
        &lt;/div&gt;
        &lt;Form
          form={form}
          onFinish={handleSubmit}
          size="large"
        &gt;
          &lt;Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          &gt;
            &lt;Input
              prefix={&lt;UserOutlined /&gt;}
              placeholder="用户名"
            /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          &gt;
            &lt;Input.Password
              prefix={&lt;LockOutlined /&gt;}
              placeholder="密码"
            /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item&gt;
            &lt;Button
              type="primary"
              htmlType="submit"
              block
              style={{ background: '#722ED1', borderColor: '#722ED1' }}
            &gt;
              登录
            &lt;/Button&gt;
          &lt;/Form.Item&gt;
        &lt;/Form&gt;
        &lt;div style={{ textAlign: 'center' }}&gt;
          &lt;Text type="secondary" style={{ fontSize: 12 }}&gt;
            返回&lt;a href="/" style={{ color: '#722ED1' }}&gt;商城首页&lt;/a&gt;
          &lt;/Text&gt;
        &lt;/div&gt;
      &lt;/Card&gt;
    &lt;/div&gt;
  );
};

export default AdminLogin;
