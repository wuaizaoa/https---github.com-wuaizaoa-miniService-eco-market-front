import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Button, Space, Divider, Tag, message, Card, InputNumber } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Loading from '@/components/Common/Loading';
import { Product } from '@/types';
import { useCartStore } from '@/stores/useCartStore';
import { formatPrice } from '@/utils/format';

const { Title, Paragraph, Text } = Typography;

// Mock product data
const getMockProduct = (id: string): Product => ({
  id: parseInt(id),
  name: '有机蔬菜礼盒',
  description: '精选当季新鲜有机蔬菜，包括：生菜、番茄、黄瓜、胡萝卜、西兰花等。无农药残留，健康安全。',
  price: 128.00,
  stock: 50,
  status: 1,
});

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (id) {
        setProduct(getMockProduct(id));
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      quantity: quantity,
      image: product.image,
    });
    message.success(`已添加 ${quantity} 件商品到购物车`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <div>商品不存在</div>;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
        返回
      </Button>

      <Row gutter={48}>
        {/* Product Image */}
        <Col xs={24} md={12}>
          <Card
            style={{
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%)',
              fontSize: 120,
            }}
          >
            🌱
          </Card>
        </Col>

        {/* Product Info */}
        <Col xs={24} md={12}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2} style={{ margin: 0 }}>{product.name}</Title>
              <Space style={{ marginTop: 16 }}>
                <Tag color={product.stock > 0 ? 'green' : 'red'}>
                  {product.stock > 0 ? `库存: ${product.stock} 件` : '已售罄'}
                </Tag>
              </Space>
            </div>

            <Title level={1} style={{ color: '#52c41a', margin: 0 }}>
              {formatPrice(product.price)}
            </Title>

            <Divider />

            <div>
              <Title level={4}>商品描述</Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                {product.description}
              </Paragraph>
            </div>

            <Divider />

            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong style={{ marginRight: 16 }}>数量：</Text>
                <InputNumber
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                  size="large"
                />
              </div>

              <Space size="middle">
                <Button
                  size="large"
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  style={{ background: '#52c41a' }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  加入购物车
                </Button>
                <Button
                  size="large"
                  type="primary"
                  style={{ background: '#fa8c16' }}
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                >
                  立即购买
                </Button>
              </Space>
            </Space>
          </Space>
        </Col>
      </Row>

      {/* Product Details */}
      <Card title="商品详情" style={{ marginTop: 24 }}>
        <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
          🌿 我们承诺所有商品均采用环保材料制作，为您和地球的健康负责。
        </Paragraph>
        <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
          💚 每购买一件商品，我们将捐出 1% 的收益用于环保公益事业。
        </Paragraph>
        <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
          📦 我们使用可回收包装，减少对环境的影响。
        </Paragraph>
      </Card>
    </Space>
  );
};

export default ProductDetail;
