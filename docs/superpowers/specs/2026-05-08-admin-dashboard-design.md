
# 后台管理系统设计文档

## 1. 概述
为微享商城新增完整的后台管理系统，包含用户管理、商品管理、订单管理功能。

### 1.1 设计原则
- 完全独立的后台架构，与前台彻底分离
- 复用现有的 Ant Design 组件库和技术栈
- 保持与前台一致的科技主题设计
- 完整的权限控制体系

### 1.2 范围
- 后台登录入口
- 后台管理 Layout
- 用户管理（增删查改）
- 商品管理（增删查改）
- 订单管理（查改）

---

## 2. 页面结构

### 2.1 首页入口
在首页 Footer 的角落添加一个小按钮，文案“后台管理”，点击跳转至 `/admin/login`

### 2.2 后台登录页 `/admin/login`
- 简洁的登录表单
- 用户名/密码输入
- 登录按钮
- 科技主题配色

### 2.3 后台 Layout `/admin/*`
- **左侧侧边栏**：用户管理、订单管理、商品管理
- **顶部栏**：Logo+系统名+退出登录
- **内容区**：各模块页面

### 2.4 用户管理页 `/admin/users`
- 用户列表表格（ID、用户名、邮箱、手机、状态、操作）
- 搜索/筛选功能
- 新增用户（弹窗）
- 编辑用户（弹窗）
- 删除用户（二次确认）
- 禁用/启用用户

### 2.5 商品管理页 `/admin/products`
- 商品列表表格（ID、名称、价格、库存、分类、状态、操作）
- 搜索/筛选功能
- 新增商品（弹窗或抽屉）
- 编辑商品（弹窗或抽屉）
- 删除商品（二次确认）
- 上架/下架

### 2.6 订单管理页 `/admin/orders`
- 订单列表表格（ID、订单号、用户ID、总金额、状态、创建时间、操作）
- 搜索/筛选功能
- 查看订单详情（弹窗）
- 更新订单状态

---

## 3. 技术实现

### 3.1 路由结构
```typescript
// 新增路由组
{
  path: '/admin',
  element: &lt;AdminLayout /&gt;,
  children: [
    { path: 'login', element: &lt;AdminLogin /&gt; },
    { 
      path: 'users', 
      element: (
        &lt;AdminProtectedRoute&gt;
          &lt;UserManagement /&gt;
        &lt;/AdminProtectedRoute&gt;
      ) 
    },
    { 
      path: 'products', 
      element: (
        &lt;AdminProtectedRoute&gt;
          &lt;ProductManagement /&gt;
        &lt;/AdminProtectedRoute&gt;
      ) 
    },
    { 
      path: 'orders', 
      element: (
        &lt;AdminProtectedRoute&gt;
          &lt;OrderManagement /&gt;
        &lt;/AdminProtectedRoute&gt;
      ) 
    },
  ]
}
```

### 3.2 文件结构
```
src/
├── pages/
│   └── Admin/
│       ├── Login.tsx              # 管理员登录
│       ├── Layout.tsx             # 后台Layout
│       ├── UserManagement.tsx     # 用户管理
│       ├── ProductManagement.tsx  # 商品管理
│       └── OrderManagement.tsx    # 订单管理
├── hooks/
│   └── useAdminAuth.tsx           # 管理员认证
├── services/
│   └── adminService.ts            # 后台API
└── types/
    └── index.ts                   # 类型定义（复用现有）
```

### 3.3 API 设计
```typescript
// src/services/adminService.ts
export const adminService = {
  // 管理员登录
  adminLogin: (data: { username: string; password: string }) =&gt; 
    api.post&lt;{ token: string }&gt;('/api/admin/login', data),
  
  // 用户管理
  getAllUsers: () =&gt; api.get&lt;User[]&gt;('/api/admin/users'),
  createUser: (data: Omit&lt;User, 'id'&gt;) =&gt; api.post&lt;User&gt;('/api/admin/users', data),
  updateUser: (id: number, data: Partial&lt;User&gt;) =&gt; 
    api.put&lt;User&gt;(`/api/admin/users/${id}`, data),
  deleteUser: (id: number) =&gt; api.delete(`/api/admin/users/${id}`),
  
  // 商品管理
  getAllProducts: () =&gt; api.get&lt;Product[]&gt;('/api/admin/products'),
  createProduct: (data: Omit&lt;Product, 'id'&gt;) =&gt; 
    api.post&lt;Product&gt;('/api/admin/products', data),
  updateProduct: (id: number, data: Partial&lt;Product&gt;) =&gt; 
    api.put&lt;Product&gt;(`/api/admin/products/${id}`, data),
  deleteProduct: (id: number) =&gt; api.delete(`/api/admin/products/${id}`),
  
  // 订单管理
  getAllOrders: () =&gt; api.get&lt;Order[]&gt;('/api/admin/orders'),
  getOrderDetail: (id: number) =&gt; api.get&lt;Order&gt;(`/api/admin/orders/${id}`),
  updateOrderStatus: (id: number, status: number) =&gt; 
    api.put(`/api/admin/orders/${id}/status`, { status }),
};
```

### 3.4 认证设计
- 使用独立的管理员token
- 存储在localStorage: `admin_token`
- AdminProtectedRoute 进行权限验证
- 401 时自动跳转至登录页

---

## 4. UI 设计

### 4.1 配色方案
延续前台的科技主题配色：
- 主色调：#722ED1（紫色）
- 辅助色：#1890FF（蓝色）
- 背景色：#0a0a1a、#1a1a3a
- 文字色：#fff、rgba(255,255,255,0.8)

### 4.2 组件选择
- 使用 Ant Design 组件库
- Table：数据展示
- Modal/Form：新增/编辑
- Button/Input/Search：操作
- Space/Row/Col：布局

---

## 5. 实现顺序

1. **基础结构**：路由配置、AdminLayout、AdminProtectedRoute
2. **认证体系**：useAdminAuth、AdminLogin
3. **首页入口**：在Footer添加后台管理按钮
4. **用户管理**：UserManagement 页面
5. **商品管理**：ProductManagement 页面
6. **订单管理**：OrderManagement 页面
7. **集成测试**：完整流程测试

---

## 6. 注意事项
- 支付功能不需要在后台实现
- 所有操作需要有二次确认或loading提示
- 保持代码风格与现有项目一致
- 复用现有组件和工具函数
