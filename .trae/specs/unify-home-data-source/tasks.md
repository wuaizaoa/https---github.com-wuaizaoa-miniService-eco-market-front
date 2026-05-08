# 统一首页数据源 - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 修改Home页面，移除mock数据并导入productService
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 移除Home页面中的mockProducts硬编码数据
  - 导入productService
  - 导入message组件用于错误提示
- **Acceptance Criteria Addressed**: [AC-1, AC-4]
- **Test Requirements**:
  - `programmatic` TR-1.1: 检查文件中不再包含mockProducts定义
  - `programmatic` TR-1.2: 检查文件导入了productService
  - `human-judgement` TR-1.3: 确认UI代码结构保持不变
- **Notes**: 参考商品列表页的导入方式

## [x] Task 2: 实现数据获取逻辑
- **Priority**: P0
- **Depends On**: [Task 1]
- **Description**: 
  - 添加useState用于存储商品数据
  - 添加useEffect在组件挂载时获取数据
  - 实现fetchData函数调用productService.getAllProducts()
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `programmatic` TR-2.1: 检查存在fetchData函数
  - `programmatic` TR-2.2: 检查fetchData调用productService.getAllProducts()
  - `human-judgement` TR-2.3: 确认数据获取逻辑正确
- **Notes**: 参考商品列表页的实现方式

## [x] Task 3: 添加加载状态和错误处理
- **Priority**: P0
- **Depends On**: [Task 2]
- **Description**: 
  - 添加loading状态
  - 在数据加载时显示Loading组件
  - 添加try-catch错误处理
  - API失败时显示错误提示
- **Acceptance Criteria Addressed**: [AC-2, AC-3]
- **Test Requirements**:
  - `programmatic` TR-3.1: 检查有loading状态管理
  - `programmatic` TR-3.2: 检查有try-catch错误处理
  - `human-judgement` TR-3.3: 确认加载状态和错误提示正常显示
- **Notes**: 使用Ant Design的message组件显示错误

## [x] Task 4: 验证功能完整性
- **Priority**: P1
- **Depends On**: [Task 3]
- **Description**: 
  - 手动测试首页数据加载
  - 验证推荐商品和新品上市区域正常显示
  - 确认与商品列表页数据一致
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4]
- **Test Requirements**:
  - `human-judgement` TR-4.1: 首页显示正确的商品数据
  - `human-judgement` TR-4.2: 加载状态正常显示
  - `human-judgement` TR-4.3: UI布局保持不变
  - `human-judgement` TR-4.4: 首页与商品列表页数据一致
- **Notes**: 需要确保后端服务正常运行
