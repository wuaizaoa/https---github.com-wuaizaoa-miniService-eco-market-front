import { useState, useEffect, useMemo } from 'react';
import { Typography, Space, Select, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductList from '@/components/Product/ProductList';
import Loading from '@/components/Common/Loading';
import type { Product, Category } from '@/types';
import { productService } from '@/services/productService';

const { Title } = Typography;
const { Option } = Select;

const ProductListPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productService.getAllProducts(),
        productService.getAllCategories(),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchText) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.categoryId === selectedCategory);
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
  }, [products, searchText, sortBy, selectedCategory]);

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
          placeholder="选择分类"
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ width: 200 }}
          allowClear
        >
          {categories.map((c) => (
            <Option key={c.id} value={c.id}>{c.name}</Option>
          ))}
        </Select>
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
