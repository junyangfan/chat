# 使用 Tauri + React + Typescript 开发的桌面端应用

使用到的技术：
* vite  
* tauri  
* react18.X
* typescript
* i18n
* antd-design
* iconfont（图标管理）
* lottie-web（动画处理）
* axios（封装请求）
* axios-retry（请求重试）
* vite-plugin-theme-preprocessor（主题切换）
* redux-toolkit（状态保存）
* cz（commit 规范）
* eslint & prettier（开发规范）


# 项目启动步骤  

* clone仓库
```
git clone https://github.com/junyangfan/chat.git
```

* 安装依赖
```
pnpm install
```

* 启动

```
// 桌面应用启动，需要安装rust，详见：https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites

pnpm tauri dev

// 网页端启动
pnpm dev
```

