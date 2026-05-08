# 首页主题更新实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标**：将首页从环保主题改为"微享商城"的霓虹赛博科技主题

**架构**：只修改单一文件 `Home/index.tsx`，保持数据获取逻辑不变，更新文案和样式

**技术栈**：React + TypeScript + Ant Design + CSS内联样式

---

## Task 1: 更新 Hero 区域品牌和样式

**文件**：
- 修改：`eco-market-front/src/pages/Home/index.tsx:38-78`

- [ ] **Step 1: 更新 Hero 背景渐变**

将原绿色渐变背景替换为深黑到深蓝的渐变：

```typescript
// 修改前
background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',

// 修改后
background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)',
```

- [ ] **Step 2: 更新品牌标题和标语**

更新标题文字并添加霓虹发光效果：

```typescript
// 修改前
<Title level={1} style={{ color: '#fff', margin: 0 }}>
  🌿 EcoMarket
</Title>
<Title level={3} style={{ color: 'rgba(255,255,255,0.9)', margin: '12px 0' }}>
  环保购物，守护地球
</Title>
<Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
  我们致力于为您提供环保、健康的商品。每一次购物，都是对地球的一份爱护。
</Paragraph>

// 修改后
<Title level={1} style={{ 
  color: '#fff', 
  margin: 0,
  textShadow: '0 0 10px #722ED1, 0 0 20px #722ED1, 0 0 30px #722ED1'
}}>
  微享商城
</Title>
<Title level={3} style={{ 
  color: 'rgba(255,255,255,0.9)', 
  margin: '12px 0',
  textShadow: '0 0 10px #1890FF, 0 0 20px #1890FF'
}}>
  畅享科技生活
</Title>
<Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
  精选数码好物，从手机到无人机，一网打尽。享受科技带来的美好生活。
</Paragraph>
```

- [ ] **Step 3: 更新按钮样式**

将按钮改为霓虹风格：

```typescript
// 修改前
<Button
  size="large"
  type="primary"
  style={{ background: '#fff', color: '#52c41a' }}
  onClick={() => navigate('/products')}
>
  立即选购 <ArrowRightOutlined />
</Button>

// 修改后
<Button
  size="large"
  style={{ 
    background: 'transparent',
    color: '#1890FF',
    border: '2px solid #1890FF',
    boxShadow: '0 0 10px #1890FF'
  }}
  onClick={() => navigate('/products')}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = '0 0 20px #1890FF';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = '0 0 10px #1890FF';
  }}
>
  立即选购 <ArrowRightOutlined />
</Button>
```

- [ ] **Step 4: 更新右侧装饰图标**

```typescript
// 修改前
<div style={{ fontSize: 120 }}>🌍</div>

// 修改后
<div style={{ fontSize: 120 }}>📱💻🎧</div>
```

---

## Task 2: 更新底部特性展示区域

**文件**：
- 修改：`eco-market-front/src/pages/Home/index.tsx:101-118`

- [ ] **Step 1: 更新特性卡片背景**

```typescript
// 修改前
<Row gutter={32} style={{ marginTop: 32, padding: '32px', background: '#fff', borderRadius: 16 }}>

// 修改后
<Row gutter={32} style={{ marginTop: 32, padding: '32px', background: '#1a1a3a', borderRadius: 16 }}>
```

- [ ] **Step 2: 更新第一个特性 - 正品保障**

```typescript
// 修改前
<Col xs={24} md={8} style={{ textAlign: 'center' }}>
  <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
  <Title level={4}>环保选材</Title>
  <Paragraph type="secondary">所有商品均采用环保材料</Paragraph>
</Col>

// 修改后
<Col xs={24} md={8} style={{ textAlign: 'center' }}>
  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
  <Title level={4} style={{ color: '#fff' }}>正品保障</Title>
  <Paragraph style={{ color: 'rgba(255,255,255,0.8)' }}>确保每一件都是正品</Paragraph>
</Col>
```

- [ ] **Step 3: 更新第二个特性 - 极速发货**

```typescript
// 修改前
<Col xs={24} md={8} style={{ textAlign: 'center' }}>
  <div style={{ fontSize: 48, marginBottom: 16 }}>🚚</div>
  <Title level={4}>绿色配送</Title>
  <Paragraph type="secondary">使用可回收包装，减少碳排放</Paragraph>
</Col>

// 修改后
<Col xs={24} md={8} style={{ textAlign: 'center' }}>
  <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
  <Title level={4} style={{ color: '#fff' }}>极速发货</Title>
  <Paragraph style={{ color: 'rgba(255,255,255,0.8)' }}>24小时内快速发货</Paragraph>
</Col>
```

- [ ] **Step 4: 更新第三个特性 - 技术支持**

```typescript
// 修改前
<Col xs={24} md={8} style={{ textAlign: 'center' }}>
  <div style={{ fontSize: 48, marginBottom: 16 }}>💚</div>
  <Title level={4}>公益回馈</Title>
  <Paragraph type="secondary">部分收益用于环保公益事业</Paragraph>
</Col>

// 修改后
<Col xs={24} md={8} style={{ textAlign: 'center' }}>
  <div style={{ fontSize: 48, marginBottom: 16 }}>🔧</div>
  <Title level={4} style={{ color: '#fff' }}>技术支持</Title>
  <Paragraph style={{ color: 'rgba(255,255,255,0.8)' }}>专业技术客服支持</Paragraph>
</Col>
```

---

## Task 3: 验证功能完整性

**文件**：
- 无需修改，验证为主

- [ ] **Step 1: 打开浏览器查看首页效果**

访问：`http://localhost:3000`

- [ ] **Step 2: 检查视觉效果**
  - [ ] Hero 背景是深黑到深蓝渐变
  - [ ] "微享商城"有紫色霓虹发光效果
  - [ ] "畅享科技生活"有青色霓虹发光效果
  - [ ] 按钮有青色霓虹边框和发光
  - [ ] 右侧显示 📱💻🎧 图标

- [ ] **Step 3: 检查特性展示区**
  - [ ] 背景是深色
  - [ ] 三个特性是"正品保障"、"极速发货"、"技术支持"
  - [ ] 文字颜色是白色/浅灰

- [ ] **Step 4: 检查功能**
  - [ ] 数据正常加载（8个数码产品）
  - [ ] "立即选购"按钮点击能跳转到商品列表
  - [ ] 商品展示正常

---

## 最终验证清单

- [ ] 首页品牌已更新为"微享商城"
- [ ] 标语是"畅享科技生活"
- [ ] 整体风格是霓虹赛博科技风
- [ ] 所有原有功能正常工作
- [ ] 没有 TypeScript 错误
- [ ] 没有控制台错误

---

## 提交信息

```bash
git add eco-market-front/src/pages/Home/index.tsx
git commit -m "feat: 更新首页为微享商城霓虹赛博科技主题"
```
