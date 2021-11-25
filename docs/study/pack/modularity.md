---
title: 模块化规范
---
## **CommonJS**
### 1. **概述**
node 应用由模块组成，采用CommonJs模块规范。每个文件就是一个模块，有自己的作用域。再一个文件里面定义的变量、函数、类都有私有的，对其他文件不可见。
**在服务器端，模块的加载时运行时同步加载的；在浏览器端，模块需要提前编译打包处理**。
### 2. **特点**
* 所有代码都运行在模块作用域内，不会污染全局作用域。
* 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接去缓存结果。要想让模块再次运行，必须清除缓存。
* 模块加载的顺序，按照其再代码中出现的顺序

### 3. **基本语法**
* 暴露模块：`module.exports = value` 或者 `exports.xxx = value`
* 引入模块： `require(xxx)`, 如果是第三方模块，xxx为模块名；如果是自定义模块 xxx为模块文件路径

**CommonJS暴露的模块到底是什么？**
> CommonJS规范规范每个模块内部，module变量代表单签模块。这个变量是一个对象，
> 他的exports属性（即`module.exports`）是对外接口
> ** 加载某个模块，气势是加载该模块的`module.exports`属性

```javascript
// example.js
const x = 5
const addX = value => value + x
module.exports.x = x
module.exports.addX = addX 
```
上面代码通过`module.exports`输出变量x和函数addX

```javascript
const example = require('./example.js')
console.log(example.x)  // 5
console.log(example.addX(1)) // 6
```
require命令用户加载模块文件，**require命令的基本功能是：读入并执行一个javascript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。**
### 4. **模块的加载机制**
**CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。**
这点与ES6模块化有重大差异，请看下面这个例子

```javascript
// lib.js
let counter = 3
const incCounter = value => {
    counter++
}
module.exports = {
    counter,
    incCounter
}
```
上面代码输出内部变量counter和改写这个变量的内部方法incCounter。

```javascript
// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;
console.log(counter);  // 3
incCounter();
console.log(counter); // 3
```
上面代码说明，counter输出以后，lib.js模块内部的变化就影响不到counter了。
**这是因为counter是一个原始类型的值，会被缓存，除非写成一个函数，才能得到内部变动后的值。**


## **AMD（异步加载模块）**
### 1. **概述**
CommonJS规范加载模块是同步的，AMD规范则是非同步加载模块，允许指定回调函数。</br>
由于NodeJS主要用于服务器编程，加载本地文件比较快，所以比较适合CommonJS。</br>
浏览器需要从服务器加载模块，所以浏览器端一般采用AMD规范

### 2. **基本语法**
定义暴露模块
```javascript
//定义没有依赖的模块
define(function(){
   return '模块'
})

//定义有依赖的模块
define(['module1', 'module2'], function(m1, m2){
  return '模块'
})
```
引入使用模块
```javascript
require(['module1', 'module2'], function(m1, m2) {
    //使用m1/m2
})
```
### 3. **未使用AMD规范与使用require.js**
**未使用AMD规范**
```javascript
// dataService.js文件
(function (window) {
  let msg = 'www.baidu.com'
  function getMsg() {
    return msg.toUpperCase()
  }
  window.dataService = {getMsg}
})(window)
```
```javascript
 // alerter.js文件
(function (window, dataService) {
  let name = 'Tom'
  function showMsg() {
    alert(dataService.getMsg() + ', ' + name)
  }
  window.alerter = {showMsg}
})(window, dataService)
```
```javascript
// main.js文件
(function (alerter) {
  alerter.showMsg()
})(alerter)
```
```html
<!-- index.html文件 -->
<div><h1>Modular Demo 1: 未使用AMD(require.js)</h1></div>
<script type="text/javascript" src="js/modules/dataService.js"></script>
<script type="text/javascript" src="js/modules/alerter.js"></script>
<script type="text/javascript" src="js/main.js"></script>
```
如上方法得出：**需要多个请求，并且依赖加载顺序不能乱**

**使用require.js**
RequireJS是个工具库，主要用于客户端的模块管理。他的模块管理遵循AMD规范，RequireJS的基本思想是，通过define方法，将代码定义为模块。通过require方法，实现代码的模块加载。

如下 RequireJS 的使用：

1. 下载RequireJS，并引入
* 官网：` http://www.requirejs.cn/`
* github：`https://github.com/requirejs/requirejs`

2. 创建项目结构
```
|-js
  |-libs
    |-require.js
  |-modules
    |-alerter.js
    |-dataService.js
  |-main.js
|-index.html
```
3. 定义RequireJS的模块代码
```javascript
// dataService.js文件 
// 定义没有依赖的模块
define(function() {
  let msg = 'www.baidu.com'
  function getMsg() {
    return msg.toUpperCase()
  }
  return { getMsg } // 暴露模块
})
```
```javascript
//alerter.js文件
// 定义有依赖的模块
define(['dataService'], function(dataService) {
  let name = 'Tom'
  function showMsg() {
    alert(dataService.getMsg() + ', ' + name)
  }
  // 暴露模块
  return { showMsg }
})
```
```javascript
// main.js文件
(function() {
  require.config({
    baseUrl: 'js/', //基本路径 出发点在根目录下
    paths: {
      //映射: 模块标识名: 路径
      alerter: './modules/alerter', //此处不能写成alerter.js,会报错
      dataService: './modules/dataService'
    }
  })
  require(['alerter'], function(alerter) {
    alerter.showMsg()
  })
})()
```
```html
<!-- index.html文件 -->
<!DOCTYPE html>
<html>
  <head>
    <title>Modular Demo</title>
  </head>
  <body>
    <!-- 引入require.js并指定js主文件的入口 -->
    <script data-main="js/main" src="js/libs/require.js"></script>
  </body>
</html>
```

4. 页面引入RequireJS模块
对代码修改
```javascript
// alerter.js文件
define(['dataService', 'jquery'], function(dataService, $) {
  let name = 'Tom'
  function showMsg() {
    alert(dataService.getMsg() + ', ' + name)
  }
  $('body').css('background', 'green')
  // 暴露模块
  return { showMsg }
})
```
```javascript
// main.js文件
(function() {
  require.config({
    baseUrl: 'js/', //基本路径 出发点在根目录下
    paths: {
      //自定义模块
      alerter: './modules/alerter', //此处不能写成alerter.js,会报错
      dataService: './modules/dataService',
      // 第三方库模块
      jquery: './libs/jquery-1.10.1' //注意：写成jQuery会报错
    }
  })
  require(['alerter'], function(alerter) {
    alerter.showMsg()
  })
})()
```
alerter.js文件中引入jQuery第三方库，main.js文件也要有相应的路径配置。

结论 ：**通过两者的比较，可以得出AMD模块定义的方法非常清晰，不会污染全局环境，能够清楚地显示依赖关系。AMD模式可以用于浏览器环境，并且允许非同步加载模块，也可以根据需要动态加载模块。**