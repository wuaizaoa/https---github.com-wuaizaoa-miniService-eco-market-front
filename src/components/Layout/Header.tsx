import { Layout, Menu, Button, Badge, Avatar, Dropdown, Typography, Space } from 'antd';
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

  const userMenuItems = [
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
        background: '#fff',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
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
            background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            fontSize: 20,
          }}
        >
          🌿
        </div>
        <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
          EcoMarket
        </Title>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ flex: 1, border: 'none', minWidth: 200 }}
        overflowedIndicator={<MenuOutlined />}
      />

      <Space size="middle">
        <Badge count={totalCount} size="small">
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate('/cart')}
          >
            购物车
          </Button>
        </Badge>

        {isLoggedIn ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar
                size="small"
                icon={<UserOutlined />}
                style={{ background: '#52c41a' }}
              />
              <span>{user?.username}</span>
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Button type="text" onClick={() => navigate('/login')}>
              登录
            </Button>
            <Button type="primary" style={{ background: '#52c41a' }} onClick={() => navigate('/register')}>
              注册
            </Button>
          </Space>
        )}
      </Space>
    </AntHeader>
  );
};

export default Header;
