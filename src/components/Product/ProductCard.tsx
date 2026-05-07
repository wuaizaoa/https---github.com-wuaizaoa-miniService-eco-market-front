import { Card, Button, Typography, Tag, Space, message } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types';
import { useCartStore } from '@/stores/useCartStore';
import { formatPrice } from '@/utils/format';

const { Title, Text } = Typography;

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      quantity: 1,
      image: product.image,
    });
    message.success('已添加到购物车');
  };

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        <div
          style={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%)',
            fontSize: 80,
          }}
        >
          {product.image ? (
            <img
              alt={product.name}
              src={product.image}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            '🌱'
          )}
        </div>
      }
      actions={[
        <Button
          key="view"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          查看详情
        </Button>,
        <Button
          key="cart"
          type="primary"
          icon={<ShoppingCartOutlined />}
          style={{ background: '#52c41a' }}
          onClick={handleAddToCart}
        >
          加入购物车
        </Button>,
      ]}
    >
      <Card.Meta
        title={<Title level={5} style={{ margin: 0 }}>{product.name}</Title>}
        description={
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Text type="secondary" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {product.description || '暂无描述'}
            </Text>
            <Space>
              <Tag color={product.stock > 0 ? 'green' : 'red'}>
                {product.stock > 0 ? `库存: ${product.stock}` : '已售罄'}
              </Tag>
            </Space>
            <Title level={4} style={{ color: '#52c41a', margin: 0 }}>
              {formatPrice(product.price)}
            </Title>
          </Space>
        }
      />
    </Card>
  );
};

export default ProductCard;
