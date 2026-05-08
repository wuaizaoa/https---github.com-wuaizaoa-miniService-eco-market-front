import { Layout, Menu, Typography, Button, Space } from 'antd';
import { UserOutlined, ShoppingOutlined, OrderedListOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '@/stores/useAdminStore';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminUser = useAdminStore((state) => state.adminUser);
  const logout = useAdminStore((state) => state.logout);

  const menuItems = [
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: '/admin/products',
      icon: <ShoppingOutlined />,
      label: '商品管理',
    },
    {
      key: '/admin/orders',
      icon: <OrderedListOutlined />,
      label: '订单管理',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          background: 'linear-gradient(180deg, #1a1a3a 0%, #0a0a1a 100%)',
        }}
        width={200}
      >
        <div style={{ padding: 16, display: 'flex', alignItems: 'center' }}>
          <DashboardOutlined style={{ fontSize: 24, color: '#722ED1', marginRight: 8 }} />
          <Title level={4} style={{ margin: 0, color: '#fff' }}>
            微享管理后台
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ background: 'transparent' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <div />
          <Space>
            <span style={{ color: '#333' }}>
              管理员：{adminUser?.username}
            </span>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              退出登录
            </Button>
          </Space>
        </Header>
        <Content
          style={{
            padding: 24,
            background: '#f0f2f5',
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
