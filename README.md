<!-- 开发前都瞅一瞅 -->

# Getting Started

## 1. 相关文档 & 前置认识：

### 1.1 框架 & 依赖
React18: https://react.dev/learn/scaling-up-with-reducer-and-context
vite:https://cn.vite.dev/guide/
Antd:https://ant.design/components/tooltip-cn#API
...


### 1.2 运行
> yarn 
> yarn dev

### 1.3 项目设计
...

## 2. 分支规范
- master 为线上运行稳定分支，保持纯净，不允许提交，只能通过dev合并。
  - master分支有变更时，打上tag
- 开发新版本时，新分支来源基于dev
  - 开发分支名称为  v[大版本].[小版本].[修复版本] 例如 1.0.0
- 修复分支也来源于dev，本地调试后合入dev
  - 修复分支为 hotfix/[描述] 例如 hotfix/title undefined
- tag 规范
  - 如现在master tag为 v1.2.9
    - 若是新功能，如添加某一新的图表类型 则新开发分支为 v1.3.0  开发完成之后 合并至dev， 上线后tag为 v1.3.0
    - 若是修复线上问题，则分支为 v1.2.10 和并至dev，上线之后 tag为v1.2.10
- commit规范
  - feat 新功能
  - fix 修改问题
  - chore 项目架构、依赖、文档变更
  - refactor 重构


## 2. 代码规范
...

