---
title: call() 与 apply() 的区别与作用
---

### 简介

> call 与 apply 都是属于Function.prototype的一个方法，它是JavaScript引擎内在实现的，
> 因为属于Function.prototype.所以每个Function对象实例都有call与apply属性。
> 既然作为方法的属性，那它们的使用就当然是针对方法的了，这两个方法是容易混淆的，因为它们的作用一样，只是使用方式不同。

### 作用

`call()`方法与`apply()`方法作用相同：**改变this的指向**

### 区别

它们的区别在于接受的参数不同：

* `call()`：第一个参数是this值没有改变，变化的是**其余参数都直接传递给函数**。在使用`call()`方法时， 传递给函数的参数**必须逐个列举出来**。
* `apply()`：传递给函数的是**参数数组**

### 示例

#### 示例代码

```javascript
var name = 'Evan';
var age = 20;
var person = {
    name: 'Hillary',
    age: 19,
    sayIntroduce: function () {
        return "Hello, My name is " + this.name + " and I'm " + this.age + ' years old.'
    },
    sayHobby: function (val1, val2) {
        return "I'm " + this.name + ", I like " + val1 + " and " + val2 + ".";
    }
}
console.log(person.sayIntroduce()); // Hello, My name is Hillary and I'm 19 years old.
```

> 当我们通过call和apply来this的指向时，不传任何参数，则默认为将this指向修改为windows

```javascript
// 当没有参数时，默认将this指向 window
console.log(person.sayIntroduce.call()); // Hello, My name is Evan and I'm 20 years old.
console.log(person.sayIntroduce.apply()); // Hello, My name is Evan and I'm 20 years old.
```

> 有参数时，this 指向第一个参数

```javascript
var person1 = {
    name: 'Coy'
}
console.log(person.sayHobby.call(person1, 'swimming', 'hiking')); // I'm Coy, I like swimming and hiking.
console.log(person.sayHobby.apply(person1, ['swimming', 'hiking'])); // I'm Coy, I like swimming and hiking.
```

> 当需要传递参数时，call可以直接写多个参数，apply需要用数组方式传递

```javascript
var person1 = {
    name: 'Coy'
}
console.log(person.sayHobby.call(person1, 'swimming', 'hiking')); // I'm Coy, I like swimming and hiking.
console.log(person.sayHobby.apply(person1, ['swimming', 'hiking'])); // I'm Coy, I like swimming and hiking.
```

构造函数示例：

```javascript
//构造函数应用
function Grade(max, min, average) {
    this.max = max;
    this.min = min;
    this.average = average;
}

function Subject(subjectName, max, min, average) {
    Grade.call(this, max, min, average);
    this.subjectName = subjectName;
}

var math = new Subject('math', 99, 60, 80);
console.log(math);
/*
输出:
{
    average: 80,
    max: 99,
    min: 60,
    subjectName: "math"
}
*/
```
