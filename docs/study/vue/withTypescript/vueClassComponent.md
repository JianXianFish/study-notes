---
title: vue-class-component
---

> [官方文档](https://class-component.vuejs.org/)<br>
> [中文文档](https://github.com/vuejs/vue-docs-zh-cn/tree/master/vue-class-component)<br>
> Vue Class Component 是一个可以让你使用Class风格语法编写Vue组件的库

下面是一个通过Vue Class Component编写的简单的计数器组件的例子:

```vue

<template>
  <div>
    <button v-on:click="decrement">-</button>
    {{ count }}
    <button v-on:click="increment">+</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
// 使用Class风格定义组件,必要。
@Component
export default class Counter extends Vue {
  // Class的属性将是组件的data
  count = 0

  // Methods will be component methods
  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}
</script>
```

## **Class 组件**

### **@Component**

> `@Component` 装饰器可以让你能创建一个基于Class的Vue组件:

```vue

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// HelloWorld class will be a Vue component
@Component
export default class HelloWorld extends Vue {
}
</script>
```

### **Data定义**

> 使用`Class`属性来初始化 data

```vue

<template>
  <div>{{ value1 }}</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // 定义 component 的 data
  value1 = 'Hello World!'

  //如果初始化的值是 undefined, Class属性将不是响应式
  value2 = undefined

  //为了防止这种情况, 你需要使用 null 来赋值, 或者使用 data 钩子来代替
  value3 = null

  data() {
    return {
      // `value4` 将是响应式的, 因为在data钩子里
      value4: undefined
    }
  }
}
</script>
```

### **Methods定义**

> 组件 `methods` 将直接定义在Class方法属性中

````vue

<template>
  <button v-on:click="hello">Click</button>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // 定义一个组件方法
  hello() {
    console.log('Hello World!')
  }
}
</script>
````

### **Computed定义**

> 计算属性可以通过Class属性的 getter / setter 定义

```vue

<template>
  <input v-model="name">
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  firstName = 'John'
  lastName = 'Doe'

  // 定义计算属性的 getter
  get name() {
    return this.firstName + ' ' + this.lastName
  }

  // 定义计算属性的 setter
  set name(value) {
    const splitted = value.split(' ')
    this.firstName = splitted[0]
    this.lastName = splitted[1] || ''
  }
}
</script>
```

### **Hooks(钩子)定义**

> `data`，`render` 以及所有Vue生命周期钩子可以直接在Class属性方法中直接定义, 但是你不能在实例本身上调用他们. 当定义自定义方法时, 你应该回避这些保留名

```tsx
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
    // 定义生命周七钩子函数
    mounted() {
        console.log('mounted')
    }

    // 定义渲染函数
    render() {
        return <div>Hello World!</div>
    }
}
```

### **其他选项**

> 对于其他的选项, 使用修饰器来配置它们

```vue

<template>
  <OtherComponent/>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import OtherComponent from './OtherComponent.vue'

@Component({
  // 查看 Vue.js 文档, 来了解所有的选项:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    OtherComponent
  }
})
export default class HelloWorld extends Vue {
}
</script>
```

## 额外钩子

> 如果你使用Vue的插件, 比如[Vue Router](https://links.jianshu.com/go?to=https%3A%2F%2Frouter.vuejs.org%2F), 你或许需要Class组件来解决它们提供的钩子. 在这个例子中, Component.registerHooks允许你注册这些钩子

```ts
// class-component-hooks.js
import Component from 'vue-class-component'

// 使用路由钩子函数的名字注册
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
])
```

在注册完这些钩子后, 就可以在Class组件中把它们当作Class属性方法来使用

```vue

<script lang="ts">
// HelloWorld.vue
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    next()
  }

  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  }

  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    next()
  }
}
</script>
```

推荐在单独的文件中写注册钩子的代码, 因为你需要在其他组件定义前注册它们. 你可以在文件顶部使用 import 引入

```ts
// main.ts
// 确定在引入其他组件前注册
import './class-component-hooks'

import Vue from 'vue'
import App from './App'

new Vue({
    el: '#app',
    render: h => h(App)
})
```

## 自定义装饰器

> 你可以通过创建你自己的装饰器来扩展功能性的库<br>
> Vue Class Component 提供 `createDecorator` 帮助创建自定义装饰器.

`createDecorator` 接受一个回调函数作为第一个参数, 回调将接受下面的参数

* `options`: Vue 组件选项. 改变这个对象将影响所提供的组件.
* `key`: 装饰器所需要的属性或方法的键.
* `parameterIndex`: 如果自定义装饰器用于参数，则装饰参数的索引

下面例子是创建一个 Log 装饰器, 当修饰器方法被调用时, 打印log信息, 包括方法名和参数:

```javascript
// decorators.js
import {createDecorator} from 'vue-class-component'

// 定义 Log 装饰器.
export const Log = createDecorator((options, key) => {
    // 保存原始方法.
    const originalMethod = options.methods[key]

    // 覆盖方法.
    options.methods[key] = function wrapperMethod(...args) {
        // 打印一个 log.
        console.log(`Invoked: ${key}(`, ...args, ')')

        // 调用原始方法
        originalMethod.apply(this, args)
    }
})
```

作为方法修饰器使用它:

```ts
import Vue from 'vue'
import Component from 'vue-class-component'
import {Log} from './decorators'

@Component
class MyComp extends Vue {
    // 当`hello`方法被调用, 打印一个log
    @Log
    hello(value) {
        // ...
    }
}

// 在上面代码中, 当 hello 被调用, 并传入 42, 将会打印处下面的log:
// Invoked: hello( 42 )
```

## 扩展 和 Mixins

### **扩展**

> 你可以扩展一个存在的Class组件, 类似于原生的Class继承. 想象你有下面的名为Super的Class组件

```ts
// super.ts
import Vue from 'vue'
import Component from 'vue-class-component'

// 定义一个叫super的Class组件
@Component
export default class Super extends Vue {
    superValue = 'Hello'
}
```

你可以扩展他, 通过使用原生的Class继承语法

```ts
import Super from './super'
import Component from 'vue-class-component'

// 扩展  名为Super的Class组件
@Component
export default class HelloWorld extends Super {
    created() {
        console.log(this.superValue) // -> Hello
    }
}
```

**注意**: 名为Super的Class组件必须是一个Class组件. 换句话说, 它需要继承作为原本的`Vue`构造器以及被 `@Component` 装饰器装饰.

### **Mixins**

> Vue Class Component 提供 `mixins` 助手函数来在Class风格中使用 `mixins`. 通过使用mixins助手, `TypeScript` 可以推断mixin类型以及在组件类型中继承它们.

```ts
// mixins.ts
import Vue from 'vue'
import Component from 'vue-class-component'

// 你可以定义和组件风格一样的 mixins .
@Component
export class Hello extends Vue {
    hello = 'Hello'
}

@Component
export class World extends Vue {
    world = 'World'
}

/** 在Class组件中使用它们: */
import Component, {mixins} from 'vue-class-component'
import {Hello, World} from './mixins'

// 使用 `mixins` 助手函数代替 `Vue`.
// `mixins` 可以接收任何数量的参数.
@Component
export class HelloWorld extends mixins(Hello, World) {
    created() {
        console.log(this.hello + ' ' + this.world + '!') // -> Hello World!
    }
}

// 和名为Super的Class组件一样, 所有的mixins 必须被定义为一个 Class 组件
```

## Class 组件的注意事项

### **在属性中初始化`this`的值**

如果你在类的属性中定义一个箭头函数, 箭头函数中访问 this 时, 将无法获取实例. 这是因为当初始化Class属性时, this仅仅时Vue实例的代理

```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MyComp extends Vue {
    foo = 123

    // 不要这么做
    bar = () => {
        // 不能这样更新属性
        // 事实上`this` 不是Vue实例.
        this.foo = 456
    }

    bar2() {
        // 正确的更新属性
        this.foo = 456
    }
}
```

### **通常使用生命周期函数代替 `constructor`**

由于原始构造函数被调用来收集初始组件数据, 建议不要自己声明 `constructor`

```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Posts extends Vue {
    posts = []

    // 不要这么做，由于 Vue 类组件的工作方式，该获取将被意外调用两次。
    constructor() {
        fetch('/posts.json')
            .then(res => res.json())
            .then(posts => {
                this.posts = posts
            })
    }

    // 建议编写生命周期钩子，例如mounted而不是constructor：
    mounted() {
        fetch('/posts.json')
            .then(res => res.json())
            .then(posts => {
                this.posts = posts
            })
    }
}
```
## Props 定义
Vue Class Component没有提供用于 props 定义的专用API, 当然, 你可以使用Vue.extend API来做到这个
````vue
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// 使用Vue的经典方法定义props
const GreetingProps = Vue.extend({
  props: {
    name: String
  }
})

// 通过扩展GreetingProps来定义 props
@Component
export default class Greeting extends GreetingProps {
  get message(): string {
    // this.name will be typed
    return 'Hello, ' + this.name
  }
}
</script>


<!-- 如果你有一个名为super的Class组件或者mixins来扩展, 使用 mixins 助手来关联定义的props -->
<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Super from './super'

// 使用Vue的经典方法定义props
const GreetingProps = Vue.extend({
  props: {
    name: String
  }
})

// 使用 `mixins` 助手来关联定义props 和一个 mixin.
@Component
export default class Greeting extends mixins(GreetingProps, Super) {
  get message(): string {
    // this.name will be typed
    return 'Hello, ' + this.name
  }
}
</script>
````

## Property Type Declaration
有时候, 你需要在Class组件外定义组件属性和方法. 例如, Vuex, Vue的状态管理库,提供 `mapGetters` 和 `mapActions` 助手来映射一个存储到组件属性和方法. 这些助手函数需要在组件对象的选项中使用.
甚至在这个例子中, 你可以将组件选项作为`@Component` 装饰器的参数. 然而, 在运行时方式工作时,它不能自动的在类型级别上定义属性和方法

```ts
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'

// post 接口
import { Post } from './post'

@Component({
  computed: mapGetters([
    'posts'
  ]),

  methods: mapActions([
    'fetchPosts'
  ])
})
export default class Posts extends Vue {
  // 在类型级别上定义 getters 和 actions的映射.
  // 你或许需要添加 `!` 在属性的名字后
  // 来避免编译错误 (definite assignment assertion).

  // 给映射的posts getter 赋予类型
  posts!: Post[]

  // 给映射的 fetchPosts action 赋予类型
  fetchPosts!: () => Promise<void>

  mounted() {
    // 使用映射的getter 和 action.
    this.fetchPosts().then(() => {
      console.log(this.posts)
    })
  }
}
```

## `$refs` 类型扩展
> `$refs`组件的类型声明为处理所有可能的ref类型的最广泛的类型. 虽然从理论上来它是收集的，但在大多数情况下，每个ref在实践中仅具有特定的元素或组件

通过在Class组件里重写$refs类型, 你可以指定一个特定的 ref 类型
```vue
<template>
  <input ref="input">
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class InputFocus extends Vue {
  // 解释 refs 的类型.
  // 符号 `!` (definite assignment assertion)
  // 用来摆脱编译错误.
  $refs!: {
    input: HTMLInputElement
  }

  mounted() {
    // 使用 `input` ref 不用抛出类型
    this.$refs.input.focus()
  }
}
</script>
```
**注意**: 需要一个类型注解(使用符号 :) 而不是赋值(=).

## Hooks Auto-complete
> vue Class Component 提供内建的钩子类型, 这将自动应用在Class组件中定义的 `data`, `render` 和 `其他生命周期钩子`上

对于 `TypeScript`. 使用它, 你需要引入位于`vue-class-component/hooks`的钩子类型
```ts
// main.ts
import 'vue-class-component/hooks'
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
```
如果你想让它可以应用在自定义钩子上, 你可以自己手动添加
```ts
import Vue from 'vue'
import { Route, RawLocation } from 'vue-router'

declare module 'vue/types/vue' {
  // 增强组件实例的类型
  interface Vue {
    beforeRouteEnter?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void

    beforeRouteLeave?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void

    beforeRouteUpdate?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void
  }
}
```