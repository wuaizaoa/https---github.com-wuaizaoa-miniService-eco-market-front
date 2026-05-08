# 统一首页数据源 - Product Requirement Document

## Overview
- **Summary**: 将eco-market-front首页从使用硬编码的Mock数据改为从后端API获取商品数据，确保整个商城数据源统一
- **Purpose**: 解决首页和商品列表页数据源不一致的问题，使答辩展示时商城数据完全来自数据库，更加真实可信
- **Target Users**: 项目开发者、答辩评委

## Goals
- 首页从后端API获取商品数据
- 统一首页和商品列表页的数据源
- 保持首页UI和功能不变，仅修改数据获取方式
- 添加加载状态和错误处理

## Non-Goals (Out of Scope)
- 不修改商品数据内容
- 不修改后端API
- 不修改数据库结构
- 不修改UI设计

## Background & Context
- 当前首页使用硬编码的mockProducts数组
- 商品列表页使用productService从后端API获取数据
- 数据库中已有完整的8个数码产品数据
- 项目已有完整的productService和API封装

## Functional Requirements
- **FR-1**: 首页使用productService.getAllProducts()获取商品数据
- **FR-2**: 首页显示加载状态（Loading组件）
- **FR-3**: 首页添加错误处理，API失败时显示提示
- **FR-4**: 移除首页的mockProducts硬编码数据

## Non-Functional Requirements
- **NFR-1**: 数据加载时间不影响用户体验
- **NFR-2**: 错误提示友好清晰

## Constraints
- **Technical**: 必须使用现有的productService，保持与商品列表页一致
- **Business**: 需要在答辩前完成
- **Dependencies**: 依赖后端product-service正常运行

## Assumptions
- 后端API接口正常工作
- 数据库中已有商品数据
- productService已经可以正常使用

## Acceptance Criteria

### AC-1: 首页从API获取数据
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: 商品数据来自后端API而非mock数据
- **Verification**: `programmatic`
- **Notes**: 检查代码中是否移除mockProducts，使用productService

### AC-2: 显示加载状态
- **Given**: 用户访问首页
- **When**: 数据正在加载中
- **Then**: 显示Loading组件
- **Verification**: `human-judgment`

### AC-3: 错误处理
- **Given**: 后端API不可用
- **When**: 首页加载失败
- **Then**: 显示错误提示信息
- **Verification**: `human-judgment`

### AC-4: UI保持一致
- **Given**: 数据成功加载
- **When**: 页面渲染完成
- **Then**: 商品展示方式与之前一致
- **Verification**: `human-judgment`

## Open Questions
- 无
