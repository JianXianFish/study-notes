---
title: 前端设计模式
---
## 什么事设计模式
**设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结**，使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性

## 设计模式的分类
> 总共可分为4大类

### **1.创建型模式**
创建型模式提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是使用 new 运算符直接实例化对象，这使得程序在判断针对某个给定实例需要创建哪些对象时更加灵活，主要包括以下几种：
* 工厂模式
* 抽象工厂模式
* 单例模式
* 建造者模式
* 原型模式

### **2.结构型模式**
结构型模式关注类和对象的组合继承的概念被用来组合接口和定义组合对象获得新功能的方式，主要包括以下几种：
* 适配器模式
* 桥接模式
* 过滤器模式
* 组合模式
* 装饰器模式
* 外观模式
* 享元模式
* 代理模式

### **3.行为型模式**
行为型模式关注对象之间的通信，用于识别对象之间常见的交互模式并加以实现，主要包括以下几种：
* 责任链模式
* 命令模式
* 解释器模式
* 迭代器模式
* 中介者模式
* 备忘录模式
* 观察者模式
* 状态模式
* 空对象模式
* 策略模式
* 模板模式
* 访问者模式

### **4.J2EE模式**
J2EE模式关注表示层，这些模式是由 Sun Java Center 鉴定的，主要包括以下几种：
* MVC 模式
* 业务代表模式
* 组合实体模式
* 数据访问对象模式
* 前端控制器模式
* 拦截过滤器模式
* 服务定位器模式
* 传输对象模式

## 前端常用设计模式
### **1.单例模式**
**`定义`**：是保证一个类只有一个实例，并且提供一个访问它的全局访问点。

**`应用`**：一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的window对象、登录浮窗等。

**`实现`**：用一个变量标识当前是否已经为某个类创建过对象，如果是，则在下一次获取这个类的实例时，直接返回之前创建的对象。

**`优点`**：
* **可以用来划分命名空间，减少全局变量的数量**
* **可以被实例化，且实例化一次，再次实例化生成的也是第一个实例**

**`例子`**：
```javascript
// 简单的ES5单例模式例子
/**
* 保证每次使用的对象都是第一次new出来的那个。
*/
var Singleton = function(name){
    this.name = name;
    this.instance = null;
};
Singleton.prototype.getName = function(){
    return this.name;
};
// 获取实例对象
Singleton.getInstance = function(name) {
    if(!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
};
```
```javascript
// ES6单例模式例子
class Singleton {
    constructor(name){
        this.name=name
        this.instance=null
    }
    static getInstance(name){
        if(!this.instance){
            this.instance = new Singleton(name)
        }
        return this.instance
    }
}
```
实现一个弹窗
```javascript
class ModalBox {
    constructor() {
        this.init()
    }
    init () {
        let modalStr = `
                <div class="modal-contain">
                    <div class="modal-content"></div>
                <div>
            `
        const $box = document.createElement('div')
        $box.classList.add('modal-box')
        $box.innerHTML = modalStr
        const $message = $box.querySelector('.modal-content')
        this.$message = $message
        this.$box = $box
        // 插入
        const $body = document.body
        $body.appendChild($box)
    }
    static getInstance ()  {
        if (!this.instance) {
            this.instance = new ModalBox()
        }
        return this.instance
    }
    show (message) {
        const { $box, $message} = this
        $message.innerHTML = message
        $box.classList.add('modal-show')
    }
    hide () {
        const { $box, $message} = this
        $message.innerHTML = ''
        $box.classList.remove('modal-show')
    }
}
// 使用
ModalBox.getInstance().show('芭比Q了') // 显示
ModalBox.getInstance().hide() // 隐藏
const a = ModalBox.getInstance()
const b = ModalBox.getInstance()
console.log(a === b) // true
```


### **2.观察者模式**
**`定义`**：也叫发布订阅模式，在这种模式中，一个订阅者订阅发布者，当一个特定的事件发生的时候，发布者会通知（调用）所有的订阅者, 对象间的一种一对多的依赖关系。

**`应用`**：当一个对象的状态发生变化时，所有依赖于他的对象都将得到通知。

**`实现`**：指定好谁充当发布者, 给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者, 发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数。

**`优点`**：时间上的解耦，对象之间的解耦

```javascript
// 简单举个例子
// 定义业务
const store = {}
store.answerList = []                       // 回复储存区
store.answer = function( fn ){             // 增加订阅者
    this.answerList.push( fn );             // 订阅的消息添加进缓存列表
}
store.problem = function(){                  // 发布消息
    for( var i = 0, fn; fn = this.answerList[ i++ ]; ){
        fn.apply( this, arguments );                    // arguments 是发布消息时带上的参数
    }
}
store.answer(function(problem) {
  console.log(`您的问题是 "${problem}" ?`)
})
store.answer(function(problem) {
  console.log('3块钱！')
})
store.problem('这水多少钱')
```
```javascript
// 业务实现事件中心
class EventCenter {
    constructor() {
        this.events = []
    }
    static getInstance ()  {
        if (!this.instance) {
            this.instance = new EventCenter()
        }
        return this.instance
    }
    on(event, handler){
        this.events[event] = this.events[event] || [];
        this.events[event].push({
            handler: handler
        });
    }

    emit(){
        const event = Array.prototype.shift.apply(arguments)
        if (!this.events[event]) {return}
        const eventList = this.events[event]
        eventList.map(item => {
            item.handler.apply(this, arguments)
        })
    }

    off(event){
        delete this.events[event];
    }
}

// 利用单例模式
const eventCenter = EventCenter.getInstance()
eventCenter.on('click', () => {
    console.log('触发1')
})
eventCenter.on('click', (value) => {
    console.log('触发2', value)
})
eventCenter.emit('click', 2)
```

### **3.工厂模式**
**`定义`**：为了不暴露创建对象的具体逻辑，将逻辑封装在一个函数中，这个函数就称为一个工厂。本质上是一个负责生产对象实例的工厂。将其成员对象的实例化推迟到子类来实现的类

**`应用`**：创建对象的流程赋值的时候，比如依赖于很多设置文件等 ；处理大量具有相同属性的小对象；注：**不能滥用**

**`实现`**：可分为
* ***简单工厂***
* ***工厂方法***
* ***抽象工厂***

**`优点`**：不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中
