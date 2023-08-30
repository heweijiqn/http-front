## 1024社区 项目在线展示地址

https://1024code.com/codecubes/kuuwbfg

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
## 贡献者
- 邱慧敏
负责开发swagger导入，项目管理，接口管理及mock服务的优化
- 何伟健
负责开发权限分配、成员管理、项目管理、角色管理以及接口的增删改查，及接口调用和监控管理
- 黄苏梦
负责ui界面的设计，数据库的设计及配置动态路由

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

