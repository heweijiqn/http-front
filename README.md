# pull代码请先star~~~
# http-front 项目介绍
`http-front` 是一个前端服务，该项目为http接口管理平台，有成员管理、角色管理、项目管理、接口管理、监控记录、登录记录、权限菜单等多项功能。

`http-backend` 是一个后端服务，旨在提供强大的HTTP请求处理和管理功能。它可以用于构建RESTful API、管理接口、权限控制等。

后端地址：https://github.com/heweijiqn/http-backend

## 演示地址
https://1024code.com/codecubes/kuuwbfg

## 项目界面展示

### 首页

![33d8b31727665010edb4de4de4a7b10](https://github.com/heweijiqn/http-front/assets/87916335/aa83c0e6-039e-4dce-8417-edb5700a4e98)

### 成员管理

![e5450f3f17c53d9bf68eb40fecd5767](https://github.com/heweijiqn/http-front/assets/87916335/aeccedee-6c57-4a82-a54b-52473fde36a8)

### 角色管理

![5946dcddc44e88cb22e404e7d993bf1](https://github.com/heweijiqn/http-front/assets/87916335/e6eeb99b-081c-4b00-b0f9-5c7120f7a84a)

### 项目管理

![335f3b9525e03c5c817b55298d6d7db](https://github.com/heweijiqn/http-front/assets/87916335/d6595f24-e0d4-438b-9f53-c0290e876a03)

### 接口管理

![34a0c266ce09a40fdd69f978becc4e7](https://github.com/heweijiqn/http-front/assets/87916335/094d1a3f-3d84-414e-adae-c7ca2841c1e4)

### 监控记录

![b51058f9d341f8a360f209ce22f47da](https://github.com/heweijiqn/http-front/assets/87916335/4c390246-a615-4203-8fdc-3c80794171ef)

### 登录记录

![ccab9fc3061f1f41aff1c249cf4547a](https://github.com/heweijiqn/http-front/assets/87916335/235232b0-e7d9-479d-b19c-050d54cf06c7)

### 权限菜单
![e7c8ef631e7f0f383125a0868f0754a](https://github.com/heweijiqn/http-front/assets/87916335/c2c5123a-a67a-4d16-9219-2514f4cb75b0)


## 项目基本功能图

![whiteboard_exported_image](https://github.com/heweijiqn/http-front/assets/87916335/fc8f3828-be2b-4ffa-83e3-f3cc4c9b407e)


# 项目以vue-admin-template为基础

```bash
# install dependency
npm install
# develop
npm run dev
```


## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```


## 技术选型
- 前端使用Vue.js 2作为主要框架，结合Element UI组件库来构建成员界面。通过前端界面，成员可以方便地管理接口、进行接口调用等操作

## 主要功能
1. Swagger导入功能：允许用户将Swagger文档导入系统，以便自动生成接口信息。Swagger是一种用于描述和定义RESTful API的工具，它提供了API的元数据，包括接口路径、请求方法、参数等。
2. 权限分配功能：负责将系统中的用户划分为不同的角色，并分配相应的权限。不同角色可以执行不同的操作，以确保系统的安全性和权限管理。
3. 成员管理功能：允许管理员管理系统中的成员，包括添加、编辑、删除成员的信息。
4. 项目管理功能：允许管理员创建、编辑和管理不同项目。每个项目可以包含多个接口，方便进行接口的组织和管理。
5. 角色管理功能：允许管理员管理系统中的角色，包括添加、编辑、删除角色的信息。
6. 接口的增删改查功能：允许管理员和成员管理接口，包括创建、编辑、删除接口的信息。
7. 接口调用和监控管理功能：允许成员调用接口进行测试，并监控接口的性能数据。

## 项目结构

主要文件夹及文件：
  - src\api\system：进行前端接口的编写
  - src\views\system：进行前端页面的编写
  - store\modules\user.js：新增菜单及按钮处理
  - store\getters.js:新增菜单及按钮处理
  - src\router:开发环境和生产环境组件导入
  - src\permission.js:动态路由生成的脚本
  - src\router:路由配置
  - src\components:动态渲染匹配到的路由组件
  - layout\components\SideBar\index.vue:获取路由配置
  - utils\btn-permission.js:权限判断

