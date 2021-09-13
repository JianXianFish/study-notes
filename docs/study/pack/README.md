---
title: 前端打包介绍
date: 2021-08-09
isTimeLine: true
categories:
 - pack
tags:
 - 前端打包工具
---
# 了解知识
> 学习打包前，需要先去了解的知识！🤪
## **模块化**
### 1. **什么是模块**
* 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
* 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

### 2.**模块化的进化过程**
* **全局function模式**：将不同的功能封装成不同的全局函数
    * 编码：将不同的功能封装成不同的全局函数
    * 问题：污染全局的命名空间，容易引起命名冲突或数据不安全，而且模块成员之间看不出直接关系
    ``` javascript
    // 例如
    function m1(){
      //...
    }
    function m2(){
      //...
    }
    ```
* **namespace模式** : 简单对象封装
    * 作用：减少全局变量，解决命名冲突
    * 问题：数据不安全 -> 歪脖可以直接修改模块内部的数据
    ``` javascript
    // 例如
    let myModule = {
      data: 'www.baidu.com',
      foo() {
        console.log(`foo() ${this.data}`)
      },
      bar() {
        console.log(`bar() ${this.data}`)
      }
    }
    myModule.data = 'other data' //能直接修改模块内部的数据
    myModule.foo() // foo() other data
    ```
    > 注： 这种写法会暴露所有模块成员，内部状态可以被外部改写
* **IIFE模式**：匿名函数自调用(闭包)
    * 作用：数据是私有的，歪脖只能通过暴露的方法操作
    * 编码：将数据和行为封装到一个函数内部，通过给window添加属性来向外暴露接口
    * 问题：无法做到多模块之间的调用
    ``` javascript
    // module.js文件
    (function(window) {
      let data = 'www.baidu.com'
      //操作数据的函数
      function foo() {
        //用于暴露有函数
        console.log(`foo() ${data}`)
      }
      function bar() {
        //用于暴露有函数
        console.log(`bar() ${data}`)
        otherFun() //内部调用
      }
      function otherFun() {
        //内部私有的函数
        console.log('otherFun()')
      }
      //暴露行为
      window.myModule = { foo, bar } //ES6写法
    })(window)
    ```
    ``` html
    <!-- index.html文件 -->
    <script type="text/javascript" src="module.js"></script>
    <script type="text/javascript">
        myModule.foo()
        myModule.bar()
        console.log(myModule.data) //undefined 不能访问模块内部数据
        myModule.data = 'xxxx' //不是修改的模块内部的data
        myModule.foo() //没有改变
    </script>
    ```
* **IIFE模式增强** : 引入依赖
    * 这种方式就是现代模块实现的基石
    ``` javascript
    // module.js文件
    (function(window, $) {
      let data = 'www.baidu.com'
      //操作数据的函数
      function foo() {
        //用于暴露有函数
        console.log(`foo() ${data}`)
        $('body').css('background', 'red')
      }
      function bar() {
        //用于暴露有函数
        console.log(`bar() ${data}`)
        otherFun() //内部调用
      }
      function otherFun() {
        //内部私有的函数
        console.log('otherFun()')
      }
      //暴露行为
      window.myModule = { foo, bar }
    })(window, jQuery)
    ```
    ``` html
    <!-- index.html文件 -->
    <!-- 引入的js必须有一定顺序 -->
    <script type="text/javascript" src="jquery-1.10.1.js"></script>
    <script type="text/javascript" src="module.js"></script>
    <script type="text/javascript">
        myModule.foo()
    </script>
    ```
    * 上例子通过jquery方法将页面的背景颜色改成红色，所以必须先引入jQuery库，就把这个库当作参数传入。
       **这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。**

### 3.**模块化的好处**
1. 避免命名冲突（减少命名空间的污染）
2. 更好的分离，按需加载
3. 更高的复用性
4. 高可维护性

### 4.**引入多个script标签后出现的问题**
* **资源请求过多**：首先我们要依赖多个模块，就需要引入多个模块，那样就会导致请求Js文件过多
* **依赖模糊**：无法判断出依赖之间的关系，无法做到正确的加载先后顺序
* **难以维护**：以上的两个原因，代指我们难以维护。
> 模块化固然有很多好处，然而一个页面需要引入多个js文件，就会影响页面的打开速度。而这个问题可以通过模块化规范来解决。

## **模块化规范**
### **CommonJS**
#### 1. **概述**
node 应用由模块组成，采用CommonJs模块规范。每个文件就是一个模块，有自己的作用域。再一个文件里面定义的变量、函数、类都有私有的，对其他文件不可见。
**在服务器端，模块的加载时运行时同步加载的；在浏览器端，模块需要提前编译打包处理**。
#### 2. **特点**
* 所有代码都运行在模块作用域内，不会污染全局作用域。
* 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接去缓存结果。要想让模块再次运行，必须清除缓存。
* 模块加载的顺序，按照其再代码中出现的顺序

#### 3. **基本语法**
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
#### 4. **模块的加载机制**
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
## 前端打包工具
> 它是一种将前端代码进行转换，压缩以及合并等操作的程序工具。目前常见的有grunt ， gulp，webpack， rollup等。

web前端打包工具，它能将我们前端人员写得less,sass等编译成css.将多个js文件合并压缩成一个js文件。它的作用就是通过将代码编译、压缩，合并等操作，来减少代码体积，减少网络请求，以及方便在服务器上运行。目前，会使用web前端打包工具是现代前端人员必备技能。打包工具在前端单页面中使用的比较多。

## 主流打包工具
### Grunt
最老牌的打包工具，它运用配置的思想来写打包脚本，一切皆配置，所以会出现比较多的配置项，诸如option,src,dest等等。而且不同的插件可能会有自己扩展字段，认知成本高，运用的时候需要明白各种插件的配置规则。
### Gulp
用代码方式来写打包脚本，并且代码采用流式的写法，只抽象出了gulp.src, gulp.pipe, gulp.dest, gulp.watch 接口，运用相当简单。更易于学习和使用，使用gulp的代码量能比grunt少一半左右。
### webpack
[*查看详情*](/study/pack/webpack)

是模块化管理工具和打包工具。通过 loader 的转换，任何形式的资源都可以视作模块，比如 Commonjs 模块、AMD 模块、ES6 模块、CSS、图片等。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。它定位是模块打包器，而 Gulp/Grunt 属于构建工具。Webpack 可以代替 Gulp/Grunt 的一些功能，但不是一个职能的工具，可以配合使用。
### Rollup
[*查看详情*](/study/pack/rollup)

下一代 ES6 模块化工具，最大的亮点是利用 ES6 模块设计，利用 tree-shaking生成更简洁、更简单的代码。一般而言，对于应用使用 Webpack，对于类库使用 Rollup；需要代码拆分(Code Splitting)，或者很多静态资源需要处理，再或者构建的项目需要引入很多 Commonjs 模块的依赖时，使用 webpack。代码库是基于 ES6 模块，而且希望代码能够被其他人直接使用，使用 Rollup。

