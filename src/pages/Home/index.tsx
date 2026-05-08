import { useEffect, useState } from 'react';
import { Typography, Row, Col, Space, Button, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProductList from '@/components/Product/ProductList';
import Loading from '@/components/Common/Loading';
import type { Product } from '@/types';
import { productService } from '@/services/productService';


const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const productsRes = await productService.getAllProducts();
      setProducts(productsRes.data);
    } catch {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)',
          borderRadius: 16,
          padding: '48px 32px',
          color: '#fff',
          marginBottom: 24,
        }}
      >
        <Row gutter={32} align="middle">
          <Col xs={24} md={12}>
            <Space direction="vertical" size="large">
              <div>
                <Title level={1} style={{ 
                  color: '#fff', 
                  margin: 0,
                  textShadow: '0 0 10px #722ED1, 0 0 20px #722ED1, 0 0 30px #722ED1'
                }}>
                  微享商城
                </Title>
                <Title level={3} style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  margin: '12px 0',
                  textShadow: '0 0 10px #1890FF, 0 0 20px #1890FF'
                }}>
                  畅享科技生活
                </Title>
                <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
                  精选数码好物，从手机到无人机，一网打尽。享受科技带来的美好生活。
                </Paragraph>
              </div>
              <Button
                size="large"
                style={{ 
                  background: 'transparent',
                  color: '#1890FF',
                  border: '2px solid #1890FF',
                  boxShadow: '0 0 10px #1890FF'
                }}
                onClick={() => navigate('/products')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px #1890FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 10px #1890FF';
                }}
              >
                立即选购 <ArrowRightOutlined />
              </Button>
            </Space>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 120 }}>📱💻🎧</div>
          </Col>
        </Row>
      </div>

      {/* Featured Products */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ margin: 0 }}>
            🌟 推荐商品
          </Title>
          <Button onClick={() => navigate('/products')}>查看全部</Button>
        </div>
        <ProductList products={products.slice(0, 4)} />
      </div>

      {/* New Arrivals */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ margin: 0 }}>
            🆕 新品上市
          </Title>
        </div>
        <ProductList products={products.slice(4, 8)} />
      </div>

      {/* Features */}
      <Row gutter={32} style={{ marginTop: 32, padding: '32px', background: '#1a1a3a', borderRadius: 16 }}>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <Title level={4} style={{ color: '#fff' }}>正品保障</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.8)' }}>确保每一件都是正品</Paragraph>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
          <Title level={4} style={{ color: '#fff' }}>极速发货</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.8)' }}>24小时内快速发货</Paragraph>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔧</div>
          <Title level={4} style={{ color: '#fff' }}>技术支持</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.8)' }}>专业技术客服支持</Paragraph>
        </Col>
      </Row>
    </Space>
  );
};

export default Home;
