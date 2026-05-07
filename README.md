# Eco-Market 前端

环保主题电商网站前端项目，基于 React + TypeScript + Vite + Ant Design 构建。

## 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design 5
- **路由**: React Router v6
- **状态管理**: Zustand
- **HTTP 客户端**: Axios

## 项目结构

```
eco-market-front/
├── public/
├── src/
│   ├── assets/
│   │   └── styles/
│   ├── components/
│   │   ├── Layout/
│   │   ├── Product/
│   │   └── Common/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Product/
│   │   ├── User/
│   │   ├── Cart/
│   │   └── Order/
│   ├── services/
│   ├── stores/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   ├── router/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## 功能特性

- 用户注册/登录
- 商品浏览与搜索
- 商品详情查看
- 购物车管理
- 订单创建与支付
- 订单查询与详情
- 响应式设计

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
npm run build
```

## 设计主题

- **主色调**: 自然绿 (#52c41a)
- **风格**: 清新、现代、环保
- **响应式**: 支持移动端、平板、桌面端

## 后端接口

前端通过以下路径访问后端微服务：

- `/api/user/*` -> 用户服务 (端口 8081)
- `/api/product/*` -> 商品服务 (端口 8082)
- `/api/order/*` -> 订单服务 (端口 8083)
- `/api/payment/*` -> 支付服务 (端口 8084)
