import { Layout, Menu, Button, Badge, Avatar, Dropdown, Typography, Space, type MenuProps } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HomeOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore';
import { useCartStore } from '@/stores/useCartStore';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user, logout } = useUserStore();
  const { totalCount } = useCartStore();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <Link to="/user">个人中心</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'orders',
      label: <Link to="/user/orders">我的订单</Link>,
      icon: <ShoppingCartOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  const menuItems = [
    {
      key: '/',
      label: <Link to="/">首页</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: '/products',
      label: <Link to="/products">商品列表</Link>,
    },
  ];

  return (
    <AntHeader
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#0a0a1a',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          marginRight: 32,
        }}
        onClick={() => navigate('/')}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #722ED1 0%, #1890FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            fontSize: 20,
            boxShadow: '0 0 10px #722ED1',
          }}
        >
          🚀
        </div>
        <Title level={4} style={{ margin: 0, color: '#fff' }}>
          微享商城
        </Title>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ flex: 1, border: 'none', minWidth: 200, background: 'transparent' }}
        theme="dark"
        overflowedIndicator={<MenuOutlined />}
        items={[
          {
            key: '/',
            label: <Link to="/">首页</Link>,
            icon: <HomeOutlined />,
          },
          {
            key: '/products',
            label: <Link to="/products">商品列表</Link>,
          },
        ]}

      />

      <Space size="middle">
        <Badge count={totalCount} size="small">
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            style={{ color: '#fff' }}
            onClick={() => navigate('/cart')}
          >
            购物车
          </Button>
        </Badge>

        {isLoggedIn ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: 'pointer', color: '#fff' }}>
              <Avatar
                size="small"
                icon={<UserOutlined />}
                style={{ background: '#722ED1' }}
              />
              <span>{user?.username}</span>
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Button type="text" style={{ color: '#fff' }} onClick={() => navigate('/login')}>
              登录
            </Button>
            <Button type="primary" style={{ background: '#722ED1', borderColor: '#722ED1' }} onClick={() => navigate('/register')}>
              注册
            </Button>
          </Space>
        )}
      </Space>
    </AntHeader>
  );
};

export default Header;
