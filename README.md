# BG WEB3 脚手架

## 前置要求

### Node

`node` 需要 `^16` 版本 (`node > 16 会出现问题`)

查看 node 版本

```shell
node -v
```

### 服务端打包

```bash
# linux serve shell command
$ git pull
$ npm i
// 测试环境
$ npm run build:test
// 正式环境
$ npm run build

将dist文件拷贝到指定目录就行了
```

## 本地运行命令一览

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:11002
$ npm run dev

# build for production and launch server
$ npm run build
```

## 接口地址

- [AI](https://github.com/bg-dao/bg-go-service-doc)

## 项目结构

```
│
├─public  打包前的public目录
├─dist  打包目录
│
├─src 源码
│  │
│  |-api 网络请求
│  |
│  |-assets 静态资源
│  |
│  |-component 常用组件
│  |
│  |-hook vue3的hook组件
│  |
│  |-directives 指令目录
│  |
│  |-layout 布局组件
│  |
│
│  |-router 路由管理
│  |
│  |-utils 工具类
│  |
│  |-view 页面目录
│  |
│  |-App.vue 主体视图
│  │
│  └─main.js 入口文件
│
└─package.json 配置文件
└─vite.config.js vite配置文件
└─.env.development 测试环境变量
└─.env.production 正式环境变量
└─.prettierrc prettier配置文件，建议使用vscode，保存文件自动格式化代码
└─index.html

```
