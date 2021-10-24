---
title: 面试后总结易错易忘
---

### **为什么要改变this指向**
<details>
<summary>点击查看答案</summary>

* this的指向是在代码运行时决定的

</details>
<br />

### **为什么组件的data必须是函数**
<details>
<summary>点击查看答案</summary>

* 根实力对象data可以是对象也可以是函数，不会产生数据勿扰情况
* 组件实力对象data必须是函数，目的是为了防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象

</details>
<br />

### **在vue中怎么定义自定义指令**
<details>
<summary>点击查看答案</summary>

```javascript
import Vue from 'vue'
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})


```

</details>
<br />

### **historyAPI怎么修改地址**
<details>
<summary>点击查看答案</summary>

* 使用`window.history.pushState()`方法
* `pushState(params, title, url)`:
  * @parmas: 历史参数开发者可根据自己定义
  * @title: 页面标题，现在大多数浏览器会屏蔽这个参数
  * @url：新页面的相对参数

</details>
<br />

### **vue hash路由的原理**
<details>
<summary>点击查看答案</summary>

* 利用`hashchange`事件去监听url的hash改变
* 核心是锚点值的改变，我们监听到锚点值改变你了就去局部改变页面数据，不做跳转

</details>
<br />

### **父子组件的渲染过程**
<details>
<summary>点击查看答案</summary>

* 父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted

</details>
<br />

### **简单说说垃圾回收机制**
<details>
<summary>点击查看答案</summary>

* js的垃圾回收机制是为了防止内存泄漏（已经不需要的某一块内存还一直存在），垃圾回收机制就是不停歇的薛兆这些不再使用的变量，并且释放掉它所指向的内存
* 在js中，js的执行环境会负责管理代码执行过程中使用的内存

</details>
<br />