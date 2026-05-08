# 请求日志功能实施计划

&gt; **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标：** 为前端应用添加请求/响应日志打印功能，在控制台中清晰显示每次 HTTP 请求的完整信息

**架构：** 在现有的 axios 拦截器中添加日志逻辑，使用 console.group 进行分组显示，并过滤敏感信息

**技术栈：** TypeScript, Axios, Console API

---

## 文件结构

| 文件 | 操作 | 职责 |
|------|------|------|
| `src/utils/request.ts` | 修改 | 添加请求/响应拦截器的日志逻辑 |

---

### Task 1: 添加敏感信息过滤辅助函数

**文件：**
- 修改：`src/utils/request.ts`

- [ ] **Step 1: 在文件顶部添加辅助函数**

在 `import` 语句之后、axios.create 之前添加：

```typescript
const filterSensitiveData = (data: any): any => {
  if (!data) return data;
  
  if (typeof data === 'string') {
    return data;
  }
  
  if (typeof data === 'object') {
    const filtered = Array.isArray(data) ? [...data] : { ...data };
    
    for (const key in filtered) {
      if (typeof filtered[key] === 'string') {
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('password') || lowerKey.includes('token') || lowerKey.includes('secret')) {
          filtered[key] = '***';
        }
      } else if (typeof filtered[key] === 'object') {
        filtered[key] = filterSensitiveData(filtered[key]);
      }
    }
    
    return filtered;
  }
  
  return data;
};

const filterSensitiveHeaders = (headers: any): any => {
  if (!headers) return headers;
  
  const filtered = { ...headers };
  
  for (const key in filtered) {
    if (key.toLowerCase() === 'authorization') {
      const authValue = filtered[key];
      if (typeof authValue === 'string' && authValue.startsWith('Bearer ')) {
        const token = authValue.slice(7);
        filtered[key] = `Bearer ${token.slice(0, 4)}****`;
      } else {
        filtered[key] = '***';
      }
    }
  }
  
  return filtered;
};
```

- [ ] **Step 2: 验证文件语法**

运行：`cd d:\coding_study\lesson\miniService\eco-market-front ; npm run lint`
预期：没有新增的 lint 错误

---

### Task 2: 在请求拦截器中添加请求日志

**文件：**
- 修改：`src/utils/request.ts:12-33`

- [ ] **Step 1: 修改请求拦截器**

将请求拦截器修改为：

```typescript
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isAdminRequest = config.url?.includes('/admin');
    
    if (isAdminRequest) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken && config.headers) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    const groupTitle = `🚀 REQUEST: ${config.method?.toUpperCase()} ${config.url}`;
    console.group(groupTitle);
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log('📍 URL:', config.url);
    console.log('📋 Method:', config.method?.toUpperCase());
    console.log('🔑 Headers:', filterSensitiveHeaders(config.headers));
    if (config.params) {
      console.log('📦 Params:', filterSensitiveData(config.params));
    }
    if (config.data) {
      console.log('📤 Body:', filterSensitiveData(config.data));
    }
    console.groupEnd();
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

- [ ] **Step 2: 验证文件语法**

运行：`cd d:\coding_study\lesson\miniService\eco-market-front ; npm run lint`
预期：没有新增的 lint 错误

---

### Task 3: 在响应拦截器中添加响应日志

**文件：**
- 修改：`src/utils/request.ts:35-65`

- [ ] **Step 1: 修改响应拦截器**

将响应拦截器修改为：

```typescript
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const config = response.config;
    const groupTitle = `✅ RESPONSE: ${config.method?.toUpperCase()} ${config.url}`;
    console.group(groupTitle);
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log('📍 URL:', config.url);
    console.log('📋 Method:', config.method?.toUpperCase());
    console.log('📊 Status:', response.status);
    console.log('📥 Headers:', filterSensitiveHeaders(response.headers));
    console.log('📦 Data:', filterSensitiveData(response.data));
    console.groupEnd();
    
    const res = response.data;
    if (res.code === 200) {
      return res.data;
    } else {
      message.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
  },
  (error) => {
    const config = error.config;
    const groupTitle = `❌ ERROR: ${config?.method?.toUpperCase()} ${config?.url}`;
    console.group(groupTitle);
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log('📍 URL:', config?.url);
    console.log('📋 Method:', config?.method?.toUpperCase());
    if (error.response) {
      console.log('📊 Status:', error.response.status);
      console.log('📥 Headers:', filterSensitiveHeaders(error.response.headers));
      console.log('📦 Data:', filterSensitiveData(error.response.data));
    }
    console.log('❌ Error Message:', error.message);
    console.groupEnd();
    
    const isAdminRequest = config?.url?.startsWith('/api/admin');
    
    if (error.response?.status === 401) {
      if (isAdminRequest) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        message.error('管理员登录已过期，请重新登录');
        window.location.href = '/admin/login';
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        message.error('登录已过期，请重新登录');
        window.location.href = '/login';
      }
    } else {
      message.error(error.message || '网络错误');
    }
    return Promise.reject(error);
  }
);
```

- [ ] **Step 2: 验证文件语法**

运行：`cd d:\coding_study\lesson\miniService\eco-market-front ; npm run lint`
预期：没有新增的 lint 错误

- [ ] **Step 3: 运行 TypeScript 类型检查**

运行：`cd d:\coding_study\lesson\miniService\eco-market-front ; npx tsc --noEmit`
预期：没有类型错误

---

### Task 4: 测试功能

**文件：**
- 测试：手动测试

- [ ] **Step 1: 启动开发服务器**

运行：`cd d:\coding_study\lesson\miniService\eco-market-front ; npm run dev`

- [ ] **Step 2: 验证请求日志**

在浏览器中打开应用，执行一些操作（如查看商品列表），检查浏览器控制台：
- 预期：能看到分组的请求日志 🚀
- 预期：能看到分组的响应日志 ✅
- 预期：敏感信息（如 Authorization header）已被过滤

- [ ] **Step 3: 停止开发服务器**

按 `Ctrl+C` 停止服务器

---

## 验收检查清单

- [ ] 每次发送请求都能在控制台看到分组的请求日志
- [ ] 每次收到响应都能在控制台看到分组的响应日志
- [ ] 敏感信息（token、密码等）被正确过滤
- [ ] 日志格式清晰易读
- [ ] 不影响现有功能正常运行
- [ ] lint 和 TypeScript 检查通过
