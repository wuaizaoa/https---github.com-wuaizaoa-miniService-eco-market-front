import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  message,
  Tag,
  Select,
  Descriptions,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import adminService from '@/services/adminService';
import type { Order, OrderItem } from '@/types';
import { formatDate, formatPrice } from '@/utils/format';

const { Option } = Select;

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<(Order & { items: OrderItem[] }) | null>(null);

  const getStatusText = (status: number) => {
    const map: Record<number, string> = {
      0: '待支付',
      1: '已支付',
      2: '已发货',
      3: '已完成',
      4: '已取消',
    };
    return map[status] || '未知';
  };

  const getStatusColor = (status: number) => {
    const map: Record<number, string> = {
      0: 'warning',
      1: 'processing',
      2: 'blue',
      3: 'success',
      4: 'default',
    };
    return map[status] || 'default';
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllOrders();
      setOrders(data);
    } catch (error) {
      message.error('获取订单列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetail = async (order: Order) => {
    try {
      const data = await adminService.getOrderDetail(order.id);
      setSelectedOrder(data);
      setDetailModalOpen(true);
    } catch (error) {
      message.error('获取订单详情失败');
    }
  };

  const handleUpdateStatus = async (id: number, status: number) => {
    try {
      await adminService.updateOrderStatus(id, status);
      message.success('状态更新成功');
      fetchOrders();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  const columns: ColumnsType<Order> = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },
    {
      title: '总金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => formatPrice(amount),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            查看
          </Button>
          <Select
            style={{ width: 120 }}
            value={record.status}
            onChange={(status) => handleUpdateStatus(record.id, status)}
          >
            <Option value={0}>待支付</Option>
            <Option value={1}>已支付</Option>
            <Option value={2}>已发货</Option>
            <Option value={3}>已完成</Option>
            <Option value={4}>已取消</Option>
          </Select>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2>订单管理</h2>
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title="订单详情"
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalOpen(false)}>
            关闭
          </Button>,
        ]}
        width={800}
      >
        {selectedOrder && (
          <>
            <Descriptions bordered column={2} style={{ marginBottom: 16 }}>
              <Descriptions.Item label="订单号">{selectedOrder.orderNo}</Descriptions.Item>
              <Descriptions.Item label="用户ID">{selectedOrder.userId}</Descriptions.Item>
              <Descriptions.Item label="总金额">{formatPrice(selectedOrder.totalAmount)}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={getStatusColor(selectedOrder.status)}>
                  {getStatusText(selectedOrder.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间" span={2}>
                {formatDate(selectedOrder.createdAt)}
              </Descriptions.Item>
            </Descriptions>
            <h4>订单商品</h4>
            <Table
              dataSource={selectedOrder.items}
              rowKey="id"
              pagination={false}
              columns={[
                {
                  title: '商品ID',
                  dataIndex: 'productId',
                  key: 'productId',
                },
                {
                  title: '商品名称',
                  dataIndex: 'productName',
                  key: 'productName',
                },
                {
                  title: '单价',
                  dataIndex: 'price',
                  key: 'price',
                  render: (price) => formatPrice(price),
                },
                {
                  title: '数量',
                  dataIndex: 'quantity',
                  key: 'quantity',
                },
                {
                  title: '小计',
                  key: 'subtotal',
                  render: (_, record) => formatPrice(record.price * record.quantity),
                },
              ]}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
