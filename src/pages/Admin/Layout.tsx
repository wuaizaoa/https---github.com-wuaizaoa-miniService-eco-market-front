import { Layout, Menu, Typography, Button, Space } from 'antd';
import { 
  UserOutlined, 
  ShoppingOutlined, 
  OrderedListOutlined,
  LogoutOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '@/stores/useAdminStore';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout: React.FC = () =&gt; {
  const navigate = useNavigate();
  const location = useLocation();
  const adminUser = useAdminStore((state) =&gt; state.adminUser);
  const logout = useAdminStore((state) =&gt; state.logout);

  const menuItems = [
    {
      key: '/admin/users',
      icon: &lt;UserOutlined /&gt;,
      label: '用户管理',
    },
    {
      key: '/admin/products',
      icon: &lt;ShoppingOutlined /&gt;,
      label: '商品管理',
    },
    {
      key: '/admin/orders',
      icon: &lt;OrderedListOutlined /&gt;,
      label: '订单管理',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) =&gt; {
    navigate(key);
  };

  const handleLogout = () =&gt; {
    logout();
    navigate('/admin/login');
  };

  return (
    &lt;Layout style={{ minHeight: '100vh' }}&gt;
      &lt;Sider
        style={{
          background: 'linear-gradient(180deg, #1a1a3a 0%, #0a0a1a 100%)',
        }}
        width={200}
      &gt;
        &lt;div style={{ padding: 16, display: 'flex', alignItems: 'center' }}&gt;
          &lt;DashboardOutlined style={{ fontSize: 24, color: '#722ED1', marginRight: 8 }} /&gt;
          &lt;Title level={4} style={{ margin: 0, color: '#fff' }}&gt;
            微享管理后台
          &lt;/Title&gt;
        &lt;/div&gt;
        &lt;Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ background: 'transparent' }}
        /&gt;
      &lt;/Sider&gt;
      &lt;Layout&gt;
        &lt;Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        &gt;
          &lt;div /&gt;
          &lt;Space&gt;
            &lt;span style={{ color: '#333' }}&gt;
              管理员：{adminUser?.username}
            &lt;/span&gt;
            &lt;Button
              type="text"
              icon={&lt;LogoutOutlined /&gt;}
              onClick={handleLogout}
            &gt;
              退出登录
            &lt;/Button&gt;
          &lt;/Space&gt;
        &lt;/Header&gt;
        &lt;Content
          style={{
            padding: 24,
            background: '#f0f2f5',
            minHeight: 280,
          }}
        &gt;
          &lt;Outlet /&gt;
        &lt;/Content&gt;
      &lt;/Layout&gt;
    &lt;/Layout&gt;
  );
};

export default AdminLayout;
