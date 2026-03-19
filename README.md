# uni-food
一个基于 Vue 3 + uni-app 的跨平台点餐应用，支持 H5、微信小程序。项目涵盖菜单浏览、购物车、订单、支付模拟、用户登录与地址管理等完整功能。

## 功能亮点
- 首页推荐与分类筛选
- 购物车与订单流程：购物车 → 地址选择 → 支付 → 成功/失败页面
- 用户功能：登录注册、地址管理、订单历史、个人资料编辑
- 跨平台支持：一次开发，多端运行

## 技术栈
| 层级 | 技术 | 用途 |
| --- | --- | --- |
| 框架 |	uni-app	Vue 3 |	跨平台编译与运行 |
| HTTP 客户端 |	uni.request 封装 |	基于自定义 Promise	集中式基础 URL + 错误处理 |
| 后端 |	json-server	^1.0.0-beta.5	| REST API 模拟|
| 构建目标 |	uni-app 编译器	|	单一源码 → 多平台输出 |
| 工具 |	Python 脚本	|	将食品列表精简为每个分类 5 项 |

## 项目结构
```text
uni-food/
├── src/
│   ├── pages/         # 页面文件
│   ├── components/    # 公共组件
│   ├── store/         # Pinia 状态管理
│   ├── utils/         # 工具函数
│   └── services/      # API 请求封装
├── static/            # 静态资源
├── mock/              # json-server 模拟数据
└── README.md
```
## 快速开始
bash
## 安装依赖
npm install

## 启动开发环境
npm run dev

## 启动 mock 后端
npm run serve

[![zread](https://img.shields.io/badge/Ask_Zread-_.svg?style=for-the-badge&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff)](https://zread.ai/unnioc/uni-food)
