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
    name: 'iPhone 15 Pro Max 256GB',
    description: '全新钛金属设计，A17 Pro芯片，4800万像素主摄，支持USB 3速度传输',
    price: 9999.00,
    stock: 50,
    categoryId: 1,
    image: 'https://picsum.photos/400/400?random=1',
    status: 1,
  },
  {
    id: 2,
    name: 'MacBook Pro 14寸 M3 Pro',
    description: 'M3 Pro芯片，18GB统一内存，512GB SSD，Liquid Retina XDR显示屏',
    price: 16999.00,
    stock: 30,
    categoryId: 2,
    image: 'https://picsum.photos/400/400?random=2',
    status: 1,
  },
  {
    id: 3,
    name: 'AirPods Pro 2',
    description: '主动降噪，自适应通透模式，个性化空间音频，USB-C充电盒',
    price: 1899.00,
    stock: 200,
    categoryId: 3,
    image: 'https://picsum.photos/400/400?random=3',
    status: 1,
  },
  {
    id: 4,
    name: 'iPad Pro 12.9寸 M2',
    description: 'M2芯片，Liquid Retina XDR显示屏，支持Apple Pencil悬停，Wi-Fi + 蜂窝',
    price: 8999.00,
    stock: 40,
    categoryId: 1,
    image: 'https://picsum.photos/400/400?random=4',
    status: 1,
  },
  {
    id: 5,
    name: 'Apple Watch Ultra 2',
    description: 'S9芯片，3000尼特亮度，精准双频GPS，100米防水',
    price: 6499.00,
    stock: 35,
    categoryId: 4,
    image: 'https://picsum.photos/400/400?random=5',
    status: 1,
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    description: '行业标杆降噪，30小时续航，多点连接，舒适轻盈设计',
    price: 2699.00,
    stock: 80,
    categoryId: 3,
    image: 'https://picsum.photos/400/400?random=6',
    status: 1,
  },
  {
    id: 7,
    name: 'Nintendo Switch OLED',
    description: '7寸OLED屏幕，64GB存储，增强音频，可拆卸Joy-Con',
    price: 2199.00,
    stock: 60,
    categoryId: 5,
    image: 'https://picsum.photos/400/400?random=7',
    status: 1,
  },
  {
    id: 8,
    name: 'DJI Mini 4 Pro',
    description: '轻于249g，全向避障，4K/60fps视频，最长34分钟续航',
    price: 5788.00,
    stock: 25,
    categoryId: 6,
    image: 'https://picsum.photos/400/400?random=8',
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
