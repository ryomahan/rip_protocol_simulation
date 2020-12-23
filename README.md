# 计算机网络原理课程设计

题目：ARPANET 网络路由选择算法的模拟实现

## 环境说明

nodejs

## 目录介绍

```
|-public 公共资源（根目录资源）目录
|-src 核心代码目录
    |-router 路由模块目录
    |-views 试图模块目录（核心代码
        |-overview 概览页面代码目录
            |- index.less 样式文件
            |- index.vue  核心代码文件
    |-App.vue 入口文件目录
    |-main.js 打包入口文件目录
|-package.json npm 包管理文件
```

## 实现流程

1. 通过 jsPlumb 包绘制网络拓扑图
2. 通过 vue data 存储网络拓扑基本信息
3. 通过 index.vue -> init 函数模拟 RIP 协议更新流程
4. 通过 index.vue -> rip 函数模拟 RIP 协议合并路由包过程