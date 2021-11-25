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

### 6. 按需引入组件

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

> 可以将第三方插件用CDN的方式进行引入。如vue，vue-router，vuex，axios等</br>
> 在vue.config.js 或者 webpack.config.js 中 在 `externals` 属性设置打包过滤</br>
> 利用 HtmlWebpackPlugin 插件 打包的时候将定义的cdn链接插入到模板index.html中</br>

如下:
* 定义 CDN文件

```javascript
// /config/cdn.config.js
// 定义CDN位置 并且 定义过滤插件文件
const CDNUrl = '地址/assets/'
const jsCDN = [
    'vue.min.js',
    'vue-router.min.js',
    'axios.min.js'
]
const assetsCDN = {
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
    },
    cdn: {
        js: [],
        css: []
    }
}
for (let js of jsCDN) {
    assetsCDN.js.push(CDNUrl + js)
}
module.exports = assetsCDN
```

* 第一种 修改 vue.config.js

```javascript
// vue.config.js
const assetsCDN = require('./config/cdn.config.js')
module.exports = {
    configureWebpack: {
        externals: assetsCDN.externals
    },
    chainWebpack: config => {
        // 将 assetsCDN 中的参数 注入到 HtmlWebpackPlugin 中
        config.plugin('html').tap(args => {
            args[0].cdn = assetsCDN.cdn
            return args
        })
    }
}
```

* 第二种 修改 webpack.config.js

```javascript
//创建webpack.config.js
const assetsCDN = require('./config/cdn.config.js')
var webpack = require('webpack');
module.exports = {
    externals: assetsCDN.externals,
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            excludeChunks: ['list', 'detail'],
            cdn: assetsCDN.cdn
        })
    ]
}
```

* 最后在 `/public/index.html` 模板文件中添加 css js 注入

```html
<!-- /public/index.html -->
<!-- css注入 -->
<% for (var i in htmlWebpackPlugin.option.cdn && htmlWebpackPlugin.option.cdn.css) { %>
<link rel="stylesheet" href="<%= htmlWebpackPlugin.option.cdn.css[i] %>"/>
<% } %>

<!-- js 注入 -->
<% for (var i in htmlWebpackPlugin.option.cdn && htmlWebpackPlugin.option.cdn.js) { %>
<script type="text/javascript" src="<%= htmlWebpackPlugin.option.cdn.js[i] %>"></script>
<% } %>
```