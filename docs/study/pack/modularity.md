---
title: 模块化规范
---
转载：[原文（https://segmentfault.com/a/1190000017466120）](https://segmentfault.com/a/1190000017466120)

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
### 3. **使用方法对比**
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
* 官网：[`https://requirejs.org/`](https://requirejs.org/)
* github：[`https://github.com/requirejs/requirejs`](https://github.com/requirejs/requirejs)

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


## **CMD（通用模块定义）**
### 1. **概述**
CMD规范是国内发展出来的，就像AMD有个requireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和requireJS一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同</br>
**CMD规范整合了CommonJS和AMD规范的特点**

### 2. **基本语法**
定义暴露模块
```javascript
//定义没有依赖的模块
define(function(require, exports, module){
  exports.xxx = value
  module.exports = value
})

/**
*  - - - - - - - - - 分割层 - - - - - - - 
*/

//定义有依赖的模块
define(function(require, exports, module){
    //引入依赖模块(同步)
    var module2 = require('./module2')
    //引入依赖模块(异步)
    require.async('./module3', function (m3) {
        //
    })
    //暴露模块
    exports.xxx = value
})
```
引用使用模块
```javascript
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})
```
### 3. **SeaJs的使用**
1. 下载sea.js，并引入
    * 官方文档：[`https://seajs.github.io/seajs/docs/`](https://seajs.github.io/seajs/docs/)

2. 创建项目结构
```
|-js
  |-libs
    |-sea.js
  |-modules
    |-module1.js
    |-module2.js
    |-module3.js
    |-module4.js
    |-main.js
|-index.html
```

3. 定义SeaJs的模块代码
```javascript
// module1.js文件
define(function (require, exports, module) {
  //内部变量数据
  var data = 'learn.mrfish.top'
  //内部函数
  function show() {
    console.log('module1 show() ' + data)
  }
  //向外暴露
  exports.show = show
})
```
```javascript
// module2.js文件
define(function (require, exports, module) {
  module.exports = {
    msg: 'I Will Back'
  }
})
```
```javascript
// module3.js文件
define(function(require, exports, module) {
  const API_KEY = 'abc123'
  exports.API_KEY = API_KEY
})
```
```javascript
// module4.js文件
define(function (require, exports, module) {
  //引入依赖模块(同步)
  var module2 = require('./module2')
  function show() {
    console.log('module4 show() ' + module2.msg)
  }
  exports.show = show
  //引入依赖模块(异步)
  require.async('./module3', function (m3) {
    console.log('异步引入依赖模块3  ' + m3.API_KEY)
  })
})
```
```javascript
// main.js文件
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})
```

4. 在index.html中引入
```html
<script type="text/javascript" src="js/libs/sea.js"></script>
<script type="text/javascript">
  seajs.use('./js/modules/main')
</script>
```
```javascript
// 打印结果是
// module1 show() learn.mrfish.top
// module4 show() I Will Back
// 异步引入依赖模块3 abc123
```
## CMD 与 AMD的区别
* 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible（尽可能懒惰）.
* CMD推崇就近依赖，只有在用到某个模块的时候再去require。AMD 推崇依赖前置

## ES模块化（ES Module）
### 1. **概述**
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。</br>
CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。


### 2. **定义**
* 每个 js 文件都是一个独立的模块
* 导入其它模块成员使用 import关键字
* 向外共享模块成员使用 export关键字

### 3. **基本语法**
```javascript
/** 定义模块 math.js **/
const basicNum = 0;
const add = function (a, b) {
    return a + b;
};
const sub = function(a, b) {
  return a - b
}
const math = {
    add,
    sub
}
export default math
export { basicNum, add };


/** 引用模块 **/
import math, { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99, basicNum);
    ele.textContent = math.sub(99, 10)
}
```

### 4. **ESModule 与 CommonJS**
**差异**：</br>
* **CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用**:
    * ES6 模块的运行机制与 CommonJS 不一样。ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
    ```javascript
        // lib.js
        export let counter = 3;
        export function incCounter() {
          counter++;
        }
        // main.js
        import { counter, incCounter } from './lib';
        console.log(counter); // 3
        incCounter();
        console.log(counter); // 4
    ```
* **CommonJS 模块是运行时加载，ES6 模块是编译时输出接口**:
    *  CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。
    **而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。**

## **总结**
* CommonJS规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。
* AMD规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，AMD规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
* CMD规范与AMD规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在Node.js中运行。不过，依赖SPM 打包，模块的加载逻辑偏重
* **ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。**
