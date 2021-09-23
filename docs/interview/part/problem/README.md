---
title: 面试题
---
> 验证前面学的东西是否记住
> 补充知识


### **1.var 和 let const 有什么区别**
<details>
<summary>点击查看答案</summary>

* var 是 ES5 语法，let const 是ES6语法；var 有变量提升
* var 和 let 是变量，可修改；const 是常量，不可修改
* let const 有块级作用域，var 没有

</details>
<br />

### **2.typeof你能判断哪些类型**

<details>

<summary>点击查看答案</summary>

* 值类型：undefined string number boolean symbol
* 引用类型：object (注意，typeof null === 'object')
* 特殊的引用类型：function

</details>
<br />


### **3.列举强制类型转换和隐式类型转换**

<details>

<summary>点击查看答案</summary>

* 强制：parseInt parseFloat toString
* 隐式：if、逻辑运算、==、+ 拼接字符串

</details>
<br />

### **4.手写深度比较，模拟lodash isEqual，实现一下效果**
```javascript
const obj1 = { a: 10, b: { x: 100, y: 200 } }
const obj2 = { a: 10, b: { x: 100, y: 200 } }

isEqual(obj1, obj2) === true
```
<details>

<summary>点击查看答案</summary>

```javascript
// 判断是否是对象或者数据
function isObject (obj) {
    return typeof obj === 'object' && obj != null
}
// 全等 (深度) - 利用递归
function isEqual (obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2
    }
    if (obj1 === obj2) {
        return true
    }
    // 两个不同的对象/数组先判断其key值是否相同
    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)
    if (obj1Keys.length !== obj2Keys.length) {
        return false
    }
    // 接着判断对于的key值是否相等
    for(let key in obj1) {
        const result = isEqual(obj1[key], obj2[key])
        if (!result) {
            return false
        }
    }
    // 如果循环都通过则就是全等
    return true
}
```

</details>
<br />

### **5.`split()` 和 `join()` 的区别**

<details>

<summary>点击查看答案</summary>

```javascript
'1-2-3'.split('-')      // ['1', '2', '3']
[1, 2, 3].join('-')     // '1-2-3'
```

</details>
<br />

### **6.数组的`pop(), push(), unshift(), shift()`分别做什么**

<details>

<summary>点击查看答案</summary>

* `pop()`: 去除数组中最后一个元素，并返回该元素。**会改变原数组**
* `push(params)`：params为元素，添加一个元素到数组最后，并返回数组长度。**会改变原数组**
* `unshift(params)`：params为元素，在数组最开始插入一个元素，并返回数组长度。**会改变原数组**
* `shift()`：去除数组第一个元素，并返回该元素。**会改变原数组**

> 扩展
> 
> 数组到API中，有哪些时候纯函数？
> 1. 不改变原数组（没有副作用）
> 2. 返回一个数组
> 
* `concat()`：合并数组，并返回新数组，对原数组不会进行改变
* `map()`: 遍历数组，可对遍历对元素进行操作。生成一个新数组，不会对原数组进行改变
* `filter()`: 对数组进行遍历过滤。生成一个新数组，不会对原数组进行改变
* `slice()`：已有的数组中返回选定的元素。不会对原数组进行改变

</details>
<br />


### **7.数组中，`slice()`和`splice()`的区别**

<details>

<summary>点击查看答案</summary>

* 功能区别：slice - 切片， splice - 剪切
* 返回值：slice 返回新数组，splice 返回截取的元素数组，并插入参数中的元素，改变原数组
* 纯函数：slice是纯函数，splice不是纯函数

</details>
<br />

### **8.`[10, 20, 30].map(parseInt)`返回结果是什么？**

<details>

<summary>点击查看答案</summary>

```javascript
const res = [10, 20, 30].map(parseInt)
console.log(res) // [10, NaN, NaN]

// 可拆解来看
[10, 20, 30].map((num, index) => {
    /**
     * parseInt(string, radix)
     * @string: 必需。要被解析的字符串。
     * @radix: 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
     */
    return parseInt(num, index)
})
```

</details>
<br />

### **9.ajax请求 get 和 post 区别**

<details>

<summary>点击查看答案</summary>

* get请求一般用于查询操作，post请求一般用户提交操作
* ge请求参数拼接在url上，post放在请求体内（数据体积可更大）
* 安全性：post易于防止CSRF

</details>
<br />

### **10.函数call 和 apply 的区别**

<details>

<summary>点击查看答案</summary>

* fn.call(this, p1, p2, p3)
* fn.apply(this, arguments) arguments是参数数组

</details>
<br />

### **11.事件代理（委托）是什么**

<details>

<summary>点击查看答案</summary>

* 事件绑定在父容器上，绑定后父容器中新增的子元素无须重新绑定事件
* 原理是通过事件冒泡的方式，通知到父容器触发。

</details>
<br />

### **12.闭包是什么，有什么特性？有什么负面影响？**

<details>

<summary>点击查看答案</summary>

* 所谓“闭包”，指的是一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函 数），因而这些变量也是该表达式的一部分
* 特性：
  1. 封闭性：外界无法访问闭包内部的数据，如果在闭包内声明变量，外界是无法访问的，除非闭包主动向外 界提供访问接口；
  2. 持久性：一般的函数，调用完毕之后，系统自动注销函数，而对于闭包来说，在外部函数被调 用之后，闭包结构依然保存在；
* 影响： 变量会常驻内存，得不到释放。

</details>
<br />

### **13.如何阻止事件冒泡和默认行为？**

<details>

<summary>点击查看答案</summary>

```javascript
event.stopPropagation() // 阻止事件冒泡
event.preventDefault() // 阻止默认事件
```

</details>
<br />

### **14.查找、添加、删除、移动DOM到方法？**

<details>

<summary>点击查看答案</summary>

```javascript
// 查找
const dd = document.getElementById('dd')
document.getElementsByClassName('dd')

// 添加
const newDom = document.createElement('div')
body.appendChild(newDom)

//删除
body.removeChild(newDom)

//移动
dd.appendChild(newDom)

```

</details>
<br />

### **15.如何减少DOM操作？**

<details>

<summary>点击查看答案</summary>

* 缓存DOM查询结果
* 多次DOM操作，合并到一次插入 
  * 使用document.createDocumentFragment()创建片段进行插入

</details>
<br />

### **16.解释jsonp的原理，为何它不是真正的ajax？**

<details>

<summary>点击查看答案</summary>

* 浏览器的同源策略和跨域的问题。
* 利用静态文件请求不在同源策略统筹内。
* 利用`<script>`标签进行请求js文件，定义方法。
* 然后调用方法。
* jsonp没用用到 XMLHttpRequest

</details>
<br />

### **17.document load 和 ready 的区别？**

<details>

<summary>点击查看答案</summary>

* `load`： 页面全部资源加载完成才执行，包括图片视频等
* `DOMContentLoaded`：DOM渲染完即可执行，此时图片、视频等，可能没加载完

</details>
<br />

### **18.== 和 ===的区别？**

<details>

<summary>点击查看答案</summary>

* == 会尝试类型转换
* === 严格相同
* 只有在 == null 等时候才会使用

</details>
<br />