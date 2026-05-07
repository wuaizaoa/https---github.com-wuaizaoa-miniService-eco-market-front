import { Typography, Card, Row, Col, Button, Space, Avatar, Divider } from 'antd';
import { UserOutlined, ShoppingOutlined, HeartOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore';

const { Title, Text, Paragraph } = Typography;

const UserCenter: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const menuItems = [
    {
      key: 'orders',
      title: '我的订单',
      icon: <ShoppingOutlined />,
      onClick: () => navigate('/user/orders'),
    },
    {
      key: 'favorites',
      title: '我的收藏',
      icon: <HeartOutlined />,
    },
    {
      key: 'settings',
      title: '账户设置',
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>用户中心</Title>

      <Row gutter={24}>
        <Col xs={24} md={8}>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
              <Avatar size={100} icon={<UserOutlined />} style={{ background: '#52c41a' }} />
              <div>
                <Title level={3} style={{ margin: 0 }}>{user?.username}</Title>
                <Text type="secondary">{user?.email}</Text>
              </div>
              <Button danger onClick={logout}>
                退出登录
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {menuItems.map((item) => (
              <Card
                key={item.key}
                hoverable
                onClick={item.onClick}
                style={{ cursor: 'pointer' }}
              >
                <Space>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <Text strong style={{ fontSize: 16 }}>{item.title}</Text>
                </Space>
              </Card>
            ))}
          </Space>
        </Col>
      </Row>

      <Card title="欢迎回来" style={{ marginTop: 24 }}>
        <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
          🌿 感谢您选择 EcoMarket，一起为地球环保出一份力！
        </Paragraph>
        <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
          💚 您的每一次购物都在为环保公益事业做贡献。
        </Paragraph>
      </Card>
    </Space>
  );
};

export default UserCenter;
