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
          background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
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
                <Title level={1} style={{ color: '#fff', margin: 0 }}>
                  🌿 EcoMarket
                </Title>
                <Title level={3} style={{ color: 'rgba(255,255,255,0.9)', margin: '12px 0' }}>
                  环保购物，守护地球
                </Title>
                <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
                  我们致力于为您提供环保、健康的商品。每一次购物，都是对地球的一份爱护。
                </Paragraph>
              </div>
              <Button
                size="large"
                type="primary"
                style={{ background: '#fff', color: '#52c41a' }}
                onClick={() => navigate('/products')}
              >
                立即选购 <ArrowRightOutlined />
              </Button>
            </Space>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 120 }}>🌍</div>
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
      <Row gutter={32} style={{ marginTop: 32, padding: '32px', background: '#fff', borderRadius: 16 }}>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
          <Title level={4}>环保选材</Title>
          <Paragraph type="secondary">所有商品均采用环保材料</Paragraph>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚚</div>
          <Title level={4}>绿色配送</Title>
          <Paragraph type="secondary">使用可回收包装，减少碳排放</Paragraph>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💚</div>
          <Title level={4}>公益回馈</Title>
          <Paragraph type="secondary">部分收益用于环保公益事业</Paragraph>
        </Col>
      </Row>
    </Space>
  );
};

export default Home;
