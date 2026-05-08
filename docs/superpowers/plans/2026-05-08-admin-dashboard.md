
# 后台管理系统 Implementation Plan

&gt; **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为微享商城新增完整的后台管理系统，包含用户管理、商品管理、订单管理功能

**Architecture:** 完全独立的后台架构，独立的Layout、登录页面、路由组，与前台彻底分离

**Tech Stack:** React + TypeScript + Ant Design + React Router + Zustand

---

## File Structure

| File | Purpose |
|------|---------|
| `src/hooks/useAdminAuth.tsx` | 管理员认证 Hook |
| `src/services/adminService.ts` | 后台管理 API 服务 |
| `src/pages/Admin/Login.tsx` | 管理员登录页面 |
| `src/pages/Admin/Layout.tsx` | 后台管理 Layout |
| `src/pages/Admin/UserManagement.tsx` | 用户管理页面 |
| `src/pages/Admin/ProductManagement.tsx` | 商品管理页面 |
| `src/pages/Admin/OrderManagement.tsx` | 订单管理页面 |
| `src/stores/useAdminStore.ts` | 管理员状态管理 |
| `src/router/index.tsx` | 添加后台路由 |
| `src/components/Layout/Footer.tsx` | 添加后台入口按钮 |

---

## Tasks

---

### Task 1: 创建管理员状态管理 store

**Files:**
- Create: `src/stores/useAdminStore.ts`

- [ ] **Step 1: 创建管理员 store**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isLoggedIn: boolean;
  adminToken: string | null;
  adminUser: { username: string } | null;
  login: (token: string, username: string) =&gt; void;
  logout: () =&gt; void;
}

export const useAdminStore = create&lt;AdminState&gt;()(
  persist(
    (set) =&gt; ({
      isLoggedIn: false,
      adminToken: null,
      adminUser: null,
      login: (token: string, username: string) =&gt; 
        set({ isLoggedIn: true, adminToken: token, adminUser: { username } }),
      logout: () =&gt; 
        set({ isLoggedIn: false, adminToken: null, adminUser: null }),
    }),
    {
      name: 'admin-storage',
    }
  )
);
```

- [ ] **Step 2: Commit**

```bash
git add src/stores/useAdminStore.ts
git commit -m "feat(admin): 创建管理员状态管理 store

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 使用 Zustand + persist 实现管理员状态管理"
```

---

### Task 2: 创建管理员认证 Hook

**Files:**
- Create: `src/hooks/useAdminAuth.tsx`

- [ ] **Step 1: 创建 useAdminAuth Hook 和 AdminProtectedRoute**

```typescript
import { useAdminStore } from '@/stores/useAdminStore';
import { Navigate, useLocation } from 'react-router-dom';

const useAdminAuth = () =&gt; {
  const isLoggedIn = useAdminStore((state) =&gt; state.isLoggedIn);
  const adminToken = useAdminStore((state) =&gt; state.adminToken);
  return { isLoggedIn, adminToken };
};

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC&lt;AdminProtectedRouteProps&gt; = ({ children }) =&gt; {
  const { isLoggedIn } = useAdminAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return &lt;Navigate to="/admin/login" state={{ from: location }} replace /&gt;;
  }

  return &lt;&gt;{children}&lt;/&gt;;
};

export default useAdminAuth;
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useAdminAuth.tsx
git commit -m "feat(admin): 创建管理员认证 Hook

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 创建 AdminProtectedRoute 进行权限验证"
```

---

### Task 3: 创建后台管理 API 服务

**Files:**
- Create: `src/services/adminService.ts`

- [ ] **Step 1: 创建 adminService**

```typescript
import api from './api';
import type { User, Product, Order, OrderItem } from '@/types';

// 管理员登录请求类型
export interface AdminLoginRequest {
  username: string;
  password: string;
}

// 管理员登录响应类型
export interface AdminLoginResponse {
  token: string;
}

export const adminService = {
  // 管理员登录
  adminLogin: (data: AdminLoginRequest) =&gt; 
    api.post&lt;AdminLoginResponse&gt;('/api/admin/login', data),

  // 用户管理
  getAllUsers: () =&gt; api.get&lt;User[]&gt;('/api/admin/users'),
  createUser: (data: Omit&lt;User, 'id' | 'createdAt' | 'updatedAt'&gt;) =&gt; 
    api.post&lt;User&gt;('/api/admin/users', data),
  updateUser: (id: number, data: Partial&lt;Omit&lt;User, 'id' | 'createdAt' | 'updatedAt'&gt;&gt;) =&gt; 
    api.put&lt;User&gt;(`/api/admin/users/${id}`, data),
  deleteUser: (id: number) =&gt; api.delete(`/api/admin/users/${id}`),

  // 商品管理
  getAllProducts: () =&gt; api.get&lt;Product[]&gt;('/api/admin/products'),
  createProduct: (data: Omit&lt;Product, 'id' | 'createdAt' | 'updatedAt'&gt;) =&gt; 
    api.post&lt;Product&gt;('/api/admin/products', data),
  updateProduct: (id: number, data: Partial&lt;Omit&lt;Product, 'id' | 'createdAt' | 'updatedAt'&gt;&gt;) =&gt; 
    api.put&lt;Product&gt;(`/api/admin/products/${id}`, data),
  deleteProduct: (id: number) =&gt; api.delete(`/api/admin/products/${id}`),

  // 订单管理
  getAllOrders: () =&gt; api.get&lt;Order[]&gt;('/api/admin/orders'),
  getOrderDetail: (id: number) =&gt; api.get&lt;Order &amp; { items: OrderItem[] }&gt;(`/api/admin/orders/${id}`),
  updateOrderStatus: (id: number, status: number) =&gt; 
    api.put(`/api/admin/orders/${id}/status`, { status }),
};

export default adminService;
```

- [ ] **Step 2: Commit**

```bash
git add src/services/adminService.ts
git commit -m "feat(admin): 创建后台管理 API 服务

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 封装用户、商品、订单的后台管理 API"
```

---

### Task 4: 更新 API 配置支持管理员 token

**Files:**
- Modify: `src/utils/request.ts`
- Read: `src/utils/request.ts` (先读取原文件)

- [ ] **Step 1: 先读取原文件内容**

```bash
type 'd:\coding_study\lesson\miniService\eco-market-front\src\utils\request.ts'
```

- [ ] **Step 2: 修改 request.ts，支持管理员 token**

```typescript
import axios from 'axios';
import { message } from 'antd';
import { useUserStore } from '@/stores/useUserStore';
import { useAdminStore } from '@/stores/useAdminStore';

// 创建 axios 实例
const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) =&gt; {
    // 检查是否是管理员 API 请求
    const isAdminRequest = config.url?.startsWith('/api/admin');
    
    if (isAdminRequest) {
      // 管理员请求
      const adminToken = useAdminStore.getState().adminToken;
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else {
      // 普通用户请求
      const token = useUserStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) =&gt; {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) =&gt; {
    return response.data;
  },
  (error) =&gt; {
    if (error.response?.status === 401) {
      message.error('登录已过期，请重新登录');
      const isAdminRequest = error.config?.url?.startsWith('/api/admin');
      if (isAdminRequest) {
        useAdminStore.getState().logout();
      } else {
        useUserStore.getState().logout();
      }
    } else {
      message.error(error.response?.data?.message || '请求失败');
    }
    return Promise.reject(error);
  }
);

export default request;
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/request.ts
git commit -m "fix(api): 更新 request.ts 支持管理员 token

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 请求拦截器根据 URL 区分使用普通用户 token 或管理员 token"
```

---

### Task 5: 创建后台管理 Layout

**Files:**
- Create: `src/pages/Admin/Layout.tsx`

- [ ] **Step 1: 创建 Admin Layout 组件**

```typescript
import { Layout, Menu, Typography, Button, Space } from 'antd';
import { 
  UserOutlined, 
  ShoppingOutlined, 
  OrderedListOutlined,
  LogoutOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '@/stores/useAdminStore';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout: React.FC = () =&gt; {
  const navigate = useNavigate();
  const location = useLocation();
  const adminUser = useAdminStore((state) =&gt; state.adminUser);
  const logout = useAdminStore((state) =&gt; state.logout);

  const menuItems = [
    {
      key: '/admin/users',
      icon: &lt;UserOutlined /&gt;,
      label: '用户管理',
    },
    {
      key: '/admin/products',
      icon: &lt;ShoppingOutlined /&gt;,
      label: '商品管理',
    },
    {
      key: '/admin/orders',
      icon: &lt;OrderedListOutlined /&gt;,
      label: '订单管理',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) =&gt; {
    navigate(key);
  };

  const handleLogout = () =&gt; {
    logout();
    navigate('/admin/login');
  };

  return (
    &lt;Layout style={{ minHeight: '100vh' }}&gt;
      &lt;Sider
        style={{
          background: 'linear-gradient(180deg, #1a1a3a 0%, #0a0a1a 100%)',
        }}
        width={200}
      &gt;
        &lt;div style={{ padding: 16, display: 'flex', alignItems: 'center' }}&gt;
          &lt;DashboardOutlined style={{ fontSize: 24, color: '#722ED1', marginRight: 8 }} /&gt;
          &lt;Title level={4} style={{ margin: 0, color: '#fff' }}&gt;
            微享管理后台
          &lt;/Title&gt;
        &lt;/div&gt;
        &lt;Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ background: 'transparent' }}
        /&gt;
      &lt;/Sider&gt;
      &lt;Layout&gt;
        &lt;Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        &gt;
          &lt;div /&gt;
          &lt;Space&gt;
            &lt;span style={{ color: '#333' }}&gt;
              管理员：{adminUser?.username}
            &lt;/span&gt;
            &lt;Button
              type="text"
              icon={&lt;LogoutOutlined /&gt;}
              onClick={handleLogout}
            &gt;
              退出登录
            &lt;/Button&gt;
          &lt;/Space&gt;
        &lt;/Header&gt;
        &lt;Content
          style={{
            padding: 24,
            background: '#f0f2f5',
            minHeight: 280,
          }}
        &gt;
          &lt;Outlet /&gt;
        &lt;/Content&gt;
      &lt;/Layout&gt;
    &lt;/Layout&gt;
  );
};

export default AdminLayout;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Admin/Layout.tsx
git commit -m "feat(admin): 创建后台管理 Layout

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 使用 Ant Design Layout 组件，包含侧边栏、顶部栏、内容区"
```

---

### Task 6: 创建管理员登录页面

**Files:**
- Create: `src/pages/Admin/Login.tsx`

- [ ] **Step 1: 创建管理员登录页面**

```typescript
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '@/stores/useAdminStore';
import adminService from '@/services/adminService';

const { Title, Text } = Typography;

const AdminLogin: React.FC = () =&gt; {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAdminStore((state) =&gt; state.login);
  const [form] = Form.useForm();

  const from = (location.state as any)?.from?.pathname || '/admin/users';

  const handleSubmit = async (values: { username: string; password: string }) =&gt; {
    try {
      const res = await adminService.adminLogin(values);
      login(res.token, values.username);
      message.success('登录成功');
      navigate(from, { replace: true });
    } catch (error) {
      message.error('登录失败，请检查用户名和密码');
    }
  };

  return (
    &lt;div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)',
      }}
    &gt;
      &lt;Card
        style={{
          width: 400,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      &gt;
        &lt;div style={{ textAlign: 'center', marginBottom: 24 }}&gt;
          &lt;Title level={3} style={{ color: '#722ED1', margin: 0 }}&gt;
            微享管理后台
          &lt;/Title&gt;
          &lt;Text type="secondary"&gt;请登录管理后台&lt;/Text&gt;
        &lt;/div&gt;
        &lt;Form
          form={form}
          onFinish={handleSubmit}
          size="large"
        &gt;
          &lt;Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          &gt;
            &lt;Input
              prefix={&lt;UserOutlined /&gt;}
              placeholder="用户名"
            /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          &gt;
            &lt;Input.Password
              prefix={&lt;LockOutlined /&gt;}
              placeholder="密码"
            /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item&gt;
            &lt;Button
              type="primary"
              htmlType="submit"
              block
              style={{ background: '#722ED1', borderColor: '#722ED1' }}
            &gt;
              登录
            &lt;/Button&gt;
          &lt;/Form.Item&gt;
        &lt;/Form&gt;
        &lt;div style={{ textAlign: 'center' }}&gt;
          &lt;Text type="secondary" style={{ fontSize: 12 }}&gt;
            返回&lt;a href="/" style={{ color: '#722ED1' }}&gt;商城首页&lt;/a&gt;
          &lt;/Text&gt;
        &lt;/div&gt;
      &lt;/Card&gt;
    &lt;/div&gt;
  );
};

export default AdminLogin;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Admin/Login.tsx
git commit -m "feat(admin): 创建管理员登录页面

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 科技主题风格的登录页面，适配深色背景"
```

---

### Task 7: 在首页 Footer 添加后台管理入口

**Files:**
- Modify: `src/components/Layout/Footer.tsx`

- [ ] **Step 1: 修改 Footer 组件，添加后台管理按钮**

```typescript
import { Layout, Row, Col, Typography, Space, Button } from 'antd';
import { RocketOutlined, ThunderboltOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer: React.FC = () =&gt; {
  const navigate = useNavigate();

  return (
    &lt;AntFooter
      style={{
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)',
        color: '#fff',
        marginTop: 'auto',
      }}
    &gt;
      &lt;Row gutter={[32, 32]} style={{ maxWidth: 1200, margin: '0 auto' }}&gt;
        &lt;Col xs={24} md={8}&gt;
          &lt;Space direction="vertical"&gt;
            &lt;div style={{ display: 'flex', alignItems: 'center' }}&gt;
              &lt;span style={{ fontSize: 24, marginRight: 8 }}&gt;🚀&lt;/span&gt;
              &lt;Title level={4} style={{ margin: 0, color: '#fff' }}&gt;
                微享商城
              &lt;/Title&gt;
            &lt;/div&gt;
            &lt;Text style={{ color: 'rgba(255,255,255,0.85)' }}&gt;
              数码好物，触手可及。我们致力于为您提供最新、最潮的电子产品。
            &lt;/Text&gt;
          &lt;/Space&gt;
        &lt;/Col&gt;
        &lt;Col xs={24} md={8}&gt;
          &lt;Space direction="vertical"&gt;
            &lt;Title level={5} style={{ margin: 0, color: '#fff' }}&gt;
              快速链接
            &lt;/Title&gt;
            &lt;a href="/" style={{ color: 'rgba(255,255,255,0.85)' }}&gt;首页&lt;/a&gt;
            &lt;a href="/products" style={{ color: 'rgba(255,255,255,0.85)' }}&gt;商品列表&lt;/a&gt;
            &lt;a href="/" style={{ color: 'rgba(255,255,255,0.85)' }}&gt;关于我们&lt;/a&gt;
          &lt;/Space&gt;
        &lt;/Col&gt;
        &lt;Col xs={24} md={8}&gt;
          &lt;Space direction="vertical"&gt;
            &lt;Title level={5} style={{ margin: 0, color: '#fff' }}&gt;
              联系我们
            &lt;/Title&gt;
            &lt;Space style={{ color: 'rgba(255,255,255,0.85)' }}&gt;
              &lt;RocketOutlined /&gt;
              &lt;span&gt;科技园区创新大厦 888 号&lt;/span&gt;
            &lt;/Space&gt;
            &lt;Text style={{ color: 'rgba(255,255,255,0.85)' }}&gt;邮箱：support@weixiang.com&lt;/Text&gt;
          &lt;/Space&gt;
        &lt;/Col&gt;
      &lt;/Row&gt;
      &lt;div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)', position: 'relative' }}&gt;
        &lt;Space&gt;
          &lt;ThunderboltOutlined /&gt;
          &lt;Text style={{ color: 'rgba(255,255,255,0.85)' }}&gt;
            © 2024 微享商城. All rights reserved. 科技改变生活，从微享开始。
          &lt;/Text&gt;
        &lt;/Space&gt;
        &lt;Button
          type="text"
          icon={&lt;SettingOutlined /&gt;}
          onClick={() =&gt; navigate('/admin/login')}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            color: 'rgba(255,255,255,0.3)',
            fontSize: 12,
          }}
        &gt;
          后台管理
        &lt;/Button&gt;
      &lt;/div&gt;
    &lt;/AntFooter&gt;
  );
};

export default Footer;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Layout/Footer.tsx
git commit -m "feat(admin): 在 Footer 添加后台管理入口按钮

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 在 Footer 右下角添加低可见度的后台管理入口"
```

---

### Task 8: 更新路由配置，添加后台管理路由

**Files:**
- Modify: `src/router/index.tsx`

- [ ] **Step 1: 修改 router/index.tsx，添加后台管理路由**

```typescript
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProductList from '../pages/Product/ProductList';
import ProductDetail from '../pages/Product/ProductDetail';
import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import UserCenter from '../pages/User/UserCenter';
import CartPage from '../pages/Cart/CartPage';
import Checkout from '../pages/Order/Checkout';
import OrderList from '../pages/Order/OrderList';
import OrderDetail from '../pages/Order/OrderDetail';
import NotFound from '../pages/NotFound';
import { ProtectedRoute } from '../hooks/useAuth';
import { AdminProtectedRoute } from '../hooks/useAdminAuth';
import AdminLogin from '../pages/Admin/Login';
import AdminLayout from '../pages/Admin/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: &lt;App /&gt;,
    children: [
      {
        index: true,
        element: &lt;Home /&gt;,
      },
      {
        path: 'products',
        element: &lt;ProductList /&gt;,
      },
      {
        path: 'products/:id',
        element: &lt;ProductDetail /&gt;,
      },
      {
        path: 'login',
        element: &lt;Login /&gt;,
      },
      {
        path: 'register',
        element: &lt;Register /&gt;,
      },
      {
        path: 'cart',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;CartPage /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: 'checkout',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;Checkout /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: 'user',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;UserCenter /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: 'user/orders',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;OrderList /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: 'user/orders/:id',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;OrderDetail /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: '*',
        element: &lt;NotFound /&gt;,
      },
    ],
  },
  {
    path: '/admin',
    element: &lt;AdminLayout /&gt;,
    children: [
      {
        index: true,
        element: &lt;AdminLogin /&gt;,
      },
      {
        path: 'login',
        element: &lt;AdminLogin /&gt;,
      },
    ],
  },
]);

export default router;
```

- [ ] **Step 2: Commit**

```bash
git add src/router/index.tsx
git commit -m "feat(admin): 更新路由配置，添加后台管理路由

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 新增 /admin 路由组，包含 AdminLayout 和 AdminLogin"
```

---

### Task 9: 创建用户管理页面

**Files:**
- Create: `src/pages/Admin/UserManagement.tsx`

- [ ] **Step 1: 创建用户管理页面组件**

```typescript
import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  message, 
  Popconfirm,
  Tag
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import adminService from '@/services/adminService';
import type { User } from '@/types';

const UserManagement: React.FC = () =&gt; {
  const [users, setUsers] = useState&lt;User[]&gt;([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState&lt;User | null&gt;(null);
  const [form] = Form.useForm();

  const fetchUsers = async () =&gt; {
    setLoading(true);
    try {
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (error) {
      message.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =&gt; {
    fetchUsers();
  }, []);

  const handleAdd = () =&gt; {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) =&gt; {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) =&gt; {
    try {
      await adminService.deleteUser(id);
      message.success('删除成功');
      fetchUsers();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () =&gt; {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await adminService.updateUser(editingUser.id, values);
        message.success('更新成功');
      } else {
        await adminService.createUser(values);
        message.success('创建成功');
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns: ColumnsType&lt;User&gt; = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) =&gt; (
        &lt;Tag color={status === 1 ? 'green' : 'red'}&gt;
          {status === 1 ? '启用' : '禁用'}
        &lt;/Tag&gt;
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) =&gt; (
        &lt;Space size="small"&gt;
          &lt;Button
            type="link"
            icon={&lt;EditOutlined /&gt;}
            onClick={() =&gt; handleEdit(record)}
          &gt;
            编辑
          &lt;/Button&gt;
          &lt;Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() =&gt; handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          &gt;
            &lt;Button type="link" danger icon={&lt;DeleteOutlined /&gt;}&gt;
              删除
            &lt;/Button&gt;
          &lt;/Popconfirm&gt;
        &lt;/Space&gt;
      ),
    },
  ];

  return (
    &lt;div&gt;
      &lt;div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}&gt;
        &lt;h2&gt;用户管理&lt;/h2&gt;
        &lt;Button
          type="primary"
          icon={&lt;PlusOutlined /&gt;}
          onClick={handleAdd}
          style={{ background: '#722ED1', borderColor: '#722ED1' }}
        &gt;
          新增用户
        &lt;/Button&gt;
      &lt;/div&gt;
      &lt;Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
      /&gt;
      &lt;Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() =&gt; setIsModalOpen(false)}
        okText="确定"
        cancelText="取消"
      &gt;
        &lt;Form form={form} layout="vertical"&gt;
          &lt;Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          &gt;
            &lt;Input /&gt;
          &lt;/Form.Item&gt;
          {!editingUser &amp;&amp; (
            &lt;Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            &gt;
              &lt;Input.Password /&gt;
            &lt;/Form.Item&gt;
          )}
          &lt;Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, type: 'email', message: '请输入有效的邮箱' }]}
          &gt;
            &lt;Input /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: '请输入手机号' }]}
          &gt;
            &lt;Input /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="status"
            label="状态"
          &gt;
            &lt;Input type="number" placeholder="1=启用, 0=禁用" /&gt;
          &lt;/Form.Item&gt;
        &lt;/Form&gt;
      &lt;/Modal&gt;
    &lt;/div&gt;
  );
};

export default UserManagement;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Admin/UserManagement.tsx
git commit -m "feat(admin): 创建用户管理页面

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 实现用户列表、新增、编辑、删除功能"
```

---

### Task 10: 创建商品管理页面

**Files:**
- Create: `src/pages/Admin/ProductManagement.tsx`

- [ ] **Step 1: 创建商品管理页面组件**

```typescript
import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  InputNumber,
  message, 
  Popconfirm,
  Tag,
  Select
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import adminService from '@/services/adminService';
import type { Product } from '@/types';

const { Option } = Select;

const ProductManagement: React.FC = () =&gt; {
  const [products, setProducts] = useState&lt;Product[]&gt;([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState&lt;Product | null&gt;(null);
  const [form] = Form.useForm();

  const fetchProducts = async () =&gt; {
    setLoading(true);
    try {
      const data = await adminService.getAllProducts();
      setProducts(data);
    } catch (error) {
      message.error('获取商品列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =&gt; {
    fetchProducts();
  }, []);

  const handleAdd = () =&gt; {
    setEditingProduct(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) =&gt; {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) =&gt; {
    try {
      await adminService.deleteProduct(id);
      message.success('删除成功');
      fetchProducts();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () =&gt; {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        await adminService.updateProduct(editingProduct.id, values);
        message.success('更新成功');
      } else {
        await adminService.createProduct(values);
        message.success('创建成功');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns: ColumnsType&lt;Product&gt; = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price) =&gt; `¥${price}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) =&gt; (
        &lt;Tag color={status === 1 ? 'green' : 'red'}&gt;
          {status === 1 ? '上架' : '下架'}
        &lt;/Tag&gt;
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) =&gt; (
        &lt;Space size="small"&gt;
          &lt;Button
            type="link"
            icon={&lt;EditOutlined /&gt;}
            onClick={() =&gt; handleEdit(record)}
          &gt;
            编辑
          &lt;/Button&gt;
          &lt;Popconfirm
            title="确定要删除这个商品吗？"
            onConfirm={() =&gt; handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          &gt;
            &lt;Button type="link" danger icon={&lt;DeleteOutlined /&gt;}&gt;
              删除
            &lt;/Button&gt;
          &lt;/Popconfirm&gt;
        &lt;/Space&gt;
      ),
    },
  ];

  return (
    &lt;div&gt;
      &lt;div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}&gt;
        &lt;h2&gt;商品管理&lt;/h2&gt;
        &lt;Button
          type="primary"
          icon={&lt;PlusOutlined /&gt;}
          onClick={handleAdd}
          style={{ background: '#722ED1', borderColor: '#722ED1' }}
        &gt;
          新增商品
        &lt;/Button&gt;
      &lt;/div&gt;
      &lt;Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
      /&gt;
      &lt;Modal
        title={editingProduct ? '编辑商品' : '新增商品'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() =&gt; setIsModalOpen(false)}
        okText="确定"
        cancelText="取消"
        width={600}
      &gt;
        &lt;Form form={form} layout="vertical"&gt;
          &lt;Form.Item
            name="name"
            label="商品名称"
            rules={[{ required: true, message: '请输入商品名称' }]}
          &gt;
            &lt;Input /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="description"
            label="商品描述"
          &gt;
            &lt;Input.TextArea rows={3} /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="price"
            label="价格"
            rules={[{ required: true, message: '请输入价格' }]}
          &gt;
            &lt;InputNumber
              style={{ width: '100%' }}
              min={0}
              precision={2}
              placeholder="请输入价格"
            /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="stock"
            label="库存"
            rules={[{ required: true, message: '请输入库存' }]}
          &gt;
            &lt;InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="请输入库存"
            /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="categoryId"
            label="分类ID"
            rules={[{ required: true, message: '请选择分类' }]}
          &gt;
            &lt;InputNumber style={{ width: '100%' }} /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="imageUrl"
            label="图片URL"
          &gt;
            &lt;Input /&gt;
          &lt;/Form.Item&gt;
          &lt;Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          &gt;
            &lt;Select placeholder="请选择状态"&gt;
              &lt;Option value={1}&gt;上架&lt;/Option&gt;
              &lt;Option value={0}&gt;下架&lt;/Option&gt;
            &lt;/Select&gt;
          &lt;/Form.Item&gt;
        &lt;/Form&gt;
      &lt;/Modal&gt;
    &lt;/div&gt;
  );
};

export default ProductManagement;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Admin/ProductManagement.tsx
git commit -m "feat(admin): 创建商品管理页面

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 实现商品列表、新增、编辑、删除功能"
```

---

### Task 11: 创建订单管理页面

**Files:**
- Create: `src/pages/Admin/OrderManagement.tsx`

- [ ] **Step 1: 创建订单管理页面组件**

```typescript
import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Modal, 
  message, 
  Tag,
  Select,
  Descriptions
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import adminService from '@/services/adminService';
import type { Order, OrderItem } from '@/types';
import { formatDate, formatPrice } from '@/utils/format';

const { Option } = Select;

const OrderManagement: React.FC = () =&gt; {
  const [orders, setOrders] = useState&lt;Order[]&gt;([]);
  const [loading, setLoading] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState&lt;(Order &amp; { items: OrderItem[] }) | null&gt;(null);

  const getStatusText = (status: number) =&gt; {
    const map: Record&lt;number, string&gt; = {
      0: '待支付',
      1: '已支付',
      2: '已发货',
      3: '已完成',
      4: '已取消',
    };
    return map[status] || '未知';
  };

  const getStatusColor = (status: number) =&gt; {
    const map: Record&lt;number, string&gt; = {
      0: 'warning',
      1: 'processing',
      2: 'blue',
      3: 'success',
      4: 'default',
    };
    return map[status] || 'default';
  };

  const fetchOrders = async () =&gt; {
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

  useEffect(() =&gt; {
    fetchOrders();
  }, []);

  const handleViewDetail = async (order: Order) =&gt; {
    try {
      const data = await adminService.getOrderDetail(order.id);
      setSelectedOrder(data);
      setDetailModalOpen(true);
    } catch (error) {
      message.error('获取订单详情失败');
    }
  };

  const handleUpdateStatus = async (id: number, status: number) =&gt; {
    try {
      await adminService.updateOrderStatus(id, status);
      message.success('状态更新成功');
      fetchOrders();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  const columns: ColumnsType&lt;Order&gt; = [
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
      render: (amount) =&gt; formatPrice(amount),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) =&gt; (
        &lt;Tag color={getStatusColor(status)}&gt;
          {getStatusText(status)}
        &lt;/Tag&gt;
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) =&gt; formatDate(date),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) =&gt; (
        &lt;Space size="small"&gt;
          &lt;Button
            type="link"
            icon={&lt;EyeOutlined /&gt;}
            onClick={() =&gt; handleViewDetail(record)}
          &gt;
            查看
          &lt;/Button&gt;
          &lt;Select
            style={{ width: 120 }}
            value={record.status}
            onChange={(status) =&gt; handleUpdateStatus(record.id, status)}
          &gt;
            &lt;Option value={0}&gt;待支付&lt;/Option&gt;
            &lt;Option value={1}&gt;已支付&lt;/Option&gt;
            &lt;Option value={2}&gt;已发货&lt;/Option&gt;
            &lt;Option value={3}&gt;已完成&lt;/Option&gt;
            &lt;Option value={4}&gt;已取消&lt;/Option&gt;
          &lt;/Select&gt;
        &lt;/Space&gt;
      ),
    },
  ];

  return (
    &lt;div&gt;
      &lt;div style={{ marginBottom: 16 }}&gt;
        &lt;h2&gt;订单管理&lt;/h2&gt;
      &lt;/div&gt;
      &lt;Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
      /&gt;
      &lt;Modal
        title="订单详情"
        open={detailModalOpen}
        onCancel={() =&gt; setDetailModalOpen(false)}
        footer={[
          &lt;Button key="close" onClick={() =&gt; setDetailModalOpen(false)}&gt;
            关闭
          &lt;/Button&gt;,
        ]}
        width={800}
      &gt;
        {selectedOrder &amp;&amp; (
          &lt;&gt;
            &lt;Descriptions bordered column={2} style={{ marginBottom: 16 }}&gt;
              &lt;Descriptions.Item label="订单号"&gt;{selectedOrder.orderNo}&lt;/Descriptions.Item&gt;
              &lt;Descriptions.Item label="用户ID"&gt;{selectedOrder.userId}&lt;/Descriptions.Item&gt;
              &lt;Descriptions.Item label="总金额"&gt;{formatPrice(selectedOrder.totalAmount)}&lt;/Descriptions.Item&gt;
              &lt;Descriptions.Item label="状态"&gt;
                &lt;Tag color={getStatusColor(selectedOrder.status)}&gt;
                  {getStatusText(selectedOrder.status)}
                &lt;/Tag&gt;
              &lt;/Descriptions.Item&gt;
              &lt;Descriptions.Item label="创建时间" span={2}&gt;
                {formatDate(selectedOrder.createdAt)}
              &lt;/Descriptions.Item&gt;
            &lt;/Descriptions&gt;
            &lt;h4&gt;订单商品&lt;/h4&gt;
            &lt;Table
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
                  render: (price) =&gt; formatPrice(price),
                },
                {
                  title: '数量',
                  dataIndex: 'quantity',
                  key: 'quantity',
                },
                {
                  title: '小计',
                  key: 'subtotal',
                  render: (_, record) =&gt; formatPrice(record.price * record.quantity),
                },
              ]}
            /&gt;
          &lt;/&gt;
        )}
      &lt;/Modal&gt;
    &lt;/div&gt;
  );
};

export default OrderManagement;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Admin/OrderManagement.tsx
git commit -m "feat(admin): 创建订单管理页面

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 实现订单列表、查看详情、更新状态功能"
```

---

### Task 12: 更新路由配置，添加管理页面路由

**Files:**
- Modify: `src/router/index.tsx`

- [ ] **Step 1: 更新 router/index.tsx，添加完整的后台管理路由**

```typescript
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProductList from '../pages/Product/ProductList';
import ProductDetail from '../pages/Product/ProductDetail';
import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import UserCenter from '../pages/User/UserCenter';
import CartPage from '../pages/Cart/CartPage';
import Checkout from '../pages/Order/Checkout';
import OrderList from '../pages/Order/OrderList';
import OrderDetail from '../pages/Order/OrderDetail';
import NotFound from '../pages/NotFound';
import { ProtectedRoute } from '../hooks/useAuth';
import { AdminProtectedRoute } from '../hooks/useAdminAuth';
import AdminLogin from '../pages/Admin/Login';
import AdminLayout from '../pages/Admin/Layout';
import UserManagement from '../pages/Admin/UserManagement';
import ProductManagement from '../pages/Admin/ProductManagement';
import OrderManagement from '../pages/Admin/OrderManagement';

const router = createBrowserRouter([
  {
    path: '/',
    element: &lt;App /&gt;,
    children: [
      {
        index: true,
        element: &lt;Home /&gt;,
      },
      {
        path: 'products',
        element: &lt;ProductList /&gt;,
      },
      {
        path: 'products/:id',
        element: &lt;ProductDetail /&gt;,
      },
      {
        path: 'login',
        element: &lt;Login /&gt;,
      },
      {
        path: 'register',
        element: &lt;Register /&gt;,
      },
      {
        path: 'cart',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;CartPage /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: 'checkout',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;Checkout /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: 'user',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;UserCenter /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: 'user/orders',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;OrderList /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: 'user/orders/:id',
        element: (
          &lt;ProtectedRoute&gt;
            &lt;OrderDetail /&gt;
          &lt;/ProtectedRoute&gt;
        ),
      },
      {
        path: '*',
        element: &lt;NotFound /&gt;,
      },
    ],
  },
  {
    path: '/admin',
    element: &lt;AdminLayout /&gt;,
    children: [
      {
        index: true,
        element: &lt;AdminLogin /&gt;,
      },
      {
        path: 'login',
        element: &lt;AdminLogin /&gt;,
      },
      {
        path: 'users',
        element: (
          &lt;AdminProtectedRoute&gt;
            &lt;UserManagement /&gt;
          &lt;/AdminProtectedRoute&gt;
        ),
      },
      {
        path: 'products',
        element: (
          &lt;AdminProtectedRoute&gt;
            &lt;ProductManagement /&gt;
          &lt;/AdminProtectedRoute&gt;
        ),
      },
      {
        path: 'orders',
        element: (
          &lt;AdminProtectedRoute&gt;
            &lt;OrderManagement /&gt;
          &lt;/AdminProtectedRoute&gt;
        ),
      },
    ],
  },
]);

export default router;
```

- [ ] **Step 2: Commit**

```bash
git add src/router/index.tsx
git commit -m "feat(admin): 完成路由配置，添加所有管理页面路由

Agent-Task: task-2026-05-08-0005
Agent-Model: Doubao-Seed-2.0-Code
Agent-Decision: 添加用户、商品、订单管理页面路由，使用 AdminProtectedRoute 保护"
```

---

## Self-Review

### Spec Coverage
- ✅ 后台管理入口 - Footer 按钮已添加
- ✅ 管理员登录 - Login 页面和认证系统
- ✅ 后台管理 Layout - 侧边栏、顶部栏
- ✅ 用户管理 - 增删查改功能
- ✅ 商品管理 - 增删查改功能
- ✅ 订单管理 - 查看和更新状态功能
- ✅ 状态管理 - useAdminStore
- ✅ 权限控制 - AdminProtectedRoute
- ✅ API 服务 - adminService

### Placeholder Scan
- ❌ 没有占位符，所有代码都是完整的
- ❌ 没有 TODO/FIXME 注释
- ❌ 没有引用未定义的类型或函数

### Type Consistency
- ✅ 所有类型引用都匹配
- ✅ User/Product/Order 类型复用自 @/types
- ✅ API 函数签名一致

---

## Execution

**Plan complete and saved to `docs/superpowers/plans/2026-05-08-admin-dashboard.md`**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
