import { useEffect, useState } from 'react';
import { Typography, Row, Col, Space, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProductList from '@/components/Product/ProductList';
import Loading from '@/components/Common/Loading';
import type { Product } from '@/types';


const { Title, Paragraph } = Typography;

// Mock data for demo
const mockProducts: Product[] = [
  {
    id: 1,
    name: '有机蔬菜礼盒',
    description: '新鲜有机蔬菜，健康生活首选',
    price: 128.00,
    stock: 50,
    status: 1,
  },
  {
    id: 2,
    name: '环保竹纤维毛巾',
    description: '天然竹纤维，柔软亲肤，可降解材质',
    price: 39.90,
    stock: 200,
    status: 1,
  },
  {
    id: 3,
    name: '天然蜂蜜礼盒',
    description: '原生态蜂蜜，纯天然无添加',
    price: 168.00,
    stock: 30,
    status: 1,
  },
  {
    id: 4,
    name: '可降解购物袋套装',
    description: '环保购物袋，可重复使用',
    price: 29.90,
    stock: 500,
    status: 1,
  },
  {
    id: 5,
    name: '有机五谷杂粮',
    description: '健康杂粮，营养丰富',
    price: 88.00,
    stock: 100,
    status: 1,
  },
  {
    id: 6,
    name: '天然精油套装',
    description: '植物提取，自然芳香',
    price: 258.00,
    stock: 40,
    status: 1,
  },
  {
    id: 7,
    name: '环保陶瓷餐具',
    description: '精致陶瓷，健康环保',
    price: 198.00,
    stock: 60,
    status: 1,
  },
  {
    id: 8,
    name: '有机水果礼盒',
    description: '当季新鲜有机水果',
    price: 158.00,
    stock: 25,
    status: 1,
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
