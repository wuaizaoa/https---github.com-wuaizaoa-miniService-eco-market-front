import { useState, useEffect, useMemo } from 'react';
import { Typography, Space, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductList from '@/components/Product/ProductList';
import Loading from '@/components/Common/Loading';
import type { Product } from '@/types';

const { Title } = Typography;
const { Option } = Select;

// Mock data
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

const ProductListPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Filter by search
    if (searchText) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'stock':
        result.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    return result;
  }, [searchText, sortBy]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>商品列表</Title>

      {/* Filters */}
      <Space wrap style={{ width: '100%', marginBottom: 24 }}>
        <Input
          placeholder="搜索商品..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          value={sortBy}
          onChange={setSortBy}
          style={{ width: 200 }}
        >
          <Option value="default">默认排序</Option>
          <Option value="price-asc">价格从低到高</Option>
          <Option value="price-desc">价格从高到低</Option>
          <Option value="stock">库存优先</Option>
        </Select>
      </Space>

      <ProductList products={filteredProducts} />
    </Space>
  );
};

export default ProductListPage;
