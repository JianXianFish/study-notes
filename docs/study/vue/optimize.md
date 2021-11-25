---
title: vue前端性能优化
---
## 代码层优化
### 1. 代码模块化
> 尽量封装复用性高的共用组件，和共用css。

### 2. v-for循环中的key值
> 在用v-for进行数据遍历渲染的时候，为每一项都设置唯一的key值，为了让Vue内部核心代码能更快的找到该条数据，当旧值和新值去对比时，可以更快的定位到diff

### 3. 合理利用vue的声明周期
> * 减少在created进行异步操作，阻塞dom渲染
> * 使用过后的全局变量，记得销毁

### 4. 合理使用keep-alive
> vue提供keep-alive组件，可以使组件进行缓存，从而节省性能

### 5. v-if v-show 的使用
> * 涉及到权限的 使用v-if， 不涉及权限并且不反复操作的 可以用v-if 避免 dom 数量过多
> * 无关权限，用户可反复操作显示隐藏的 使用 v-show
> > v-show 比 v-if 更加节约性能，因为v-show避免了dom节点的销毁和重建


## 配置优化
### 1. Vue路由设置成懒加载的形式
```js
{
    component: resolve => require(['组件位置path', resolve])
}
```

### 2. vue.config.js 配置文件修改
> * 修改`productionSourceMap`为`flase` 避免打包后生成map文件。
> * 修改`productionGzip`为`true` 开启Gzip压缩，可以使打包后体积更小
```js
// vue.config.js
module.exports = {
    productionSourceMap: true, // 改成 false
    productionGzip: false // 改成true
}
```

### 3. 使用cdn的方式引入外部资源
> 