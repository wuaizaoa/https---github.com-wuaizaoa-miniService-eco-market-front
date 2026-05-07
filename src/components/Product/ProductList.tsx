import { Row, Col, Empty } from 'antd';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  if (products.length === 0) {
    return <Empty description="暂无商品" />;
  }

  return (
    <Row gutter={[24, 24]}>
      {products.map((product) => (
        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
