import { Layout, Row, Col, Typography, Space } from 'antd';
import { RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter
      style={{
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)',
        color: '#fff',
        marginTop: 'auto',
      }}
    >
      <Row gutter={[32, 32]} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Col xs={24} md={8}>
          <Space direction="vertical">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 24, marginRight: 8 }}>🚀</span>
              <Title level={4} style={{ margin: 0, color: '#fff' }}>
                微享商城
              </Title>
            </div>
            <Text style={{ color: 'rgba(255,255,255,0.85)' }}>
              数码好物，触手可及。我们致力于为您提供最新、最潮的电子产品。
            </Text>
          </Space>
        </Col>
        <Col xs={24} md={8}>
          <Space direction="vertical">
            <Title level={5} style={{ margin: 0, color: '#fff' }}>
              快速链接
            </Title>
            <a href="/" style={{ color: 'rgba(255,255,255,0.85)' }}>首页</a>
            <a href="/products" style={{ color: 'rgba(255,255,255,0.85)' }}>商品列表</a>
            <a href="/" style={{ color: 'rgba(255,255,255,0.85)' }}>关于我们</a>
          </Space>
        </Col>
        <Col xs={24} md={8}>
          <Space direction="vertical">
            <Title level={5} style={{ margin: 0, color: '#fff' }}>
              联系我们
            </Title>
            <Space style={{ color: 'rgba(255,255,255,0.85)' }}>
              <RocketOutlined />
              <span>科技园区创新大厦 888 号</span>
            </Space>
            <Text style={{ color: 'rgba(255,255,255,0.85)' }}>邮箱：support@weixiang.com</Text>
          </Space>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <Space>
          <ThunderboltOutlined />
          <Text style={{ color: 'rgba(255,255,255,0.85)' }}>
            © 2024 微享商城. All rights reserved. 科技改变生活，从微享开始。
          </Text>
        </Space>
      </div>
    </AntFooter>
  );
};

export default Footer;
