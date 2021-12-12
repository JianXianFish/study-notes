---
title: +Typescript 开发
---
> `vue-property-decorator`完全依赖于
> [`vue-class-component`](/study/vue/withTypescript/vueClassComponent)
> ,因此使用前得先了解一下
> [`vue-class-component`](/study/vue/withTypescript/vueClassComponent)

## **安装**
```
npm i -S vue-property-decorator
```

## **用法**
> 这里有几个装饰器和一个函数(Mixin)

### **@Component**
```ts
@Component(options: ComponentOptions = {})
```
@Component 装饰器可以接收一个对象作为参数，可以在对象中声明 components ，filters，directives等未提供装饰器的选项，也可以声明computed，watch等
由 [`vue-class-component`](/study/vue/withTypescript/vueClassComponent) 提供


### **@Prop**
```ts
/**
 *  @options: 
 *      Constructor: 例如String，Number，Boolean等，指定 prop 的类型;
 *      Constructor[]: 指定 prop 的可选类型
 *      PropOptions: 可选 type，default，required，validator。
 * */
@Prop(options: (PropOptions | Constructor[] | Constructor) = {})
// 属性的ts类型后面需要加上undefined类型；
// 或者在属性名后面加上!，表示非null 和 非undefined的断言，否则编译器会给出错误提示；

```
例子：
```vue
<!-- 父组件 -->
<template>
  <div class="Props">
    <PropComponent :name="name" :age="age" :sex="sex"></PropComponent>
  </div>
</template>
 
<script lang="ts">
import {Component, Vue,} from 'vue-property-decorator';
import PropComponent from '@/components/PropComponent.vue';
 
@Component({
  components: {PropComponent,},
})
export default class PropsPage extends Vue {
  private name = '张三';
  private age = 1;
  private sex = 'nan';
}
</script>
 
<!-- 子组件 -->
<template>
  <div class="hello">
    name: {{name}} | age: {{age}} | sex: {{sex}}
  </div>
</template>
 
<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
 
@Component
export default class PropComponent extends Vue {
   @Prop(String) readonly name!: string | undefined;
   @Prop({ default: 30, type: Number }) private age!: number;
   @Prop([String, Boolean]) private sex!: string | boolean;
}
</script>
```


### **@PropSync**
```ts
/**
 * @propName: string, 表示父组件传递过来的属性名
 * @options: 与@Prop的第一个参数一致
 * */
@PropSync(propName: string, options: (PropOptions | Constructor[] | Constructor) = {})
```
@PropSync装饰器与@prop用法类似，二者的区别在于:
* @PropSync 装饰器接收两个参数
* @PropSync 会生成一个新的计算属性

**注意**: 使用PropSync的时候是要在父组件配合.sync使用的
```vue
<!-- 父组件-->
<template>
  <div class="PropSync">
    <h1>父组件</h1>
    like:{{like}}
    <hr/>
    <PropSyncComponent :like.sync="like"></PropSyncComponent>
  </div>
</template>
 
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import PropSyncComponent from '@/components/PropSyncComponent.vue';
 
@Component({components: { PropSyncComponent },})
export default class PropSyncPage extends Vue {
  private like = '父组件的like';
}
</script>
```
```vue
<!--子组件-->
<template>
  <div class="hello">
    <h1>子组件:</h1>
    <h2>syncedlike:{{ syncedlike }}</h2>
    <button @click="editLike()">修改like</button>
  </div>
</template>
 
<script lang="ts">
import { Component, Prop, Vue, PropSync,} from 'vue-property-decorator';
 
@Component
export default class PropSyncComponent extends Vue {
  @PropSync('like', { type: String }) syncedlike!: string; // 用来实现组件的双向绑定,子组件可以更改父组件穿过来的值
 
  editLike(): void {
    this.syncedlike = '子组件修改过后的syncedlike!'; // 双向绑定,更改syncedlike会更改父组件的like
  }
}
</script>
```

### **@Model**
```ts
/**
 * @event: string, 事件名
 * @options: 与@Prop的第一个参数一致
 * */
@Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})
```
> @Model装饰器允许我们在一个组件上自定义v-model

```vue
<!--父组件-->
<template>
  <div class="Model">
    <ModelComponent v-model="fooTs" value="some value"></ModelComponent>
    <div>父组件 app : {{fooTs}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModelComponent from '@/components/ModelComponent.vue';
 
@Component({ components: {ModelComponent} })
export default class ModelPage extends Vue {
  private fooTs = 'App Foo!';
}
</script>
```
```vue
<!--子组件-->
<template>
  <div class="hello">
    子组件:<input type="text" :value="checked" @input="inputHandle($event)"/>
  </div>
</template>
 
<script lang="ts">
import {Component, Vue, Model, Emit} from 'vue-property-decorator';
 
@Component
export default class ModelComponent extends Vue {
   @Model('change', { type: String }) readonly checked!: string
 
  @Emit('change')
   public inputHandle(that: any): void {
     return that.target.value
   }
}
</script>
```

### ***@Watch***
```ts
/**
 * @path: string, 被侦听的属性名
 * @options?: WatchOptions: {
 *          immediate?: boolean 侦听开始之后是否立即调用该回调函数
 *          deep?: boolean 被侦听的对象的属性被改变时，是否调用该回调函数
 *      }
 */
@Watch(path: string, options: WatchOptions = {})
```
**触发在beforeCreate勾子之后，created勾子之前**
```vue
<template>
  <div class="PropSync">
    <h1>child:{{child}}</h1>
    <input type="text" v-model="child"/>
  </div>
</template>
 
<script lang="ts">
import { Vue, Watch, Component } from 'vue-property-decorator';
 
@Component
export default class WatchPage extends Vue {
  private child = '';
 
  @Watch('child')
  onChildChanged(newValue: string, oldValue: string) {
    console.log(newValue);
    console.log(oldValue);
  }
}
</script>
```

### **@Emit**
```ts
/**
 * @event?: string, 事件名称
 */
@Emit(event?: string)
```
* @Emit 装饰器接收一个可选参数，该参数是$Emit的第一个参数，充当事件名。如果没有提供这个参数，$Emit会将回调函数名的camelCase转为kebab-case，并将其作为事件名；
* @Emit会将回调函数的返回值作为第二个参数，如果返回值是一个Promise对象，$emit会在Promise对象被标记为resolved之后触发；
* @Emit的回调函数的参数，会放在其返回值之后，一起被$emit当做参数使用。

```vue
<!-- 父组件 -->
<template>
  <div class="">
    点击emit获取子组件的名字<br/>
    姓名:{{emitData.name}}
    <hr/>
    <EmitComponent sex='女' @add-to-count="returnPersons" @delemit="delemit"></EmitComponent>
  </div>
</template>
 
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import EmitComponent from '@/components/EmitComponent.vue';
 
@Component({
  components: { EmitComponent },
})
export default class EmitPage extends Vue {
  private emitData = { name: '我还没有名字' };
 
  returnPersons(data: any) {
    this.emitData = data;
  }
 
  delemit(event: MouseEvent) {
    console.log(this.emitData);
    console.log(event);
  }
}
</script>
```
```vue
<!-- 子组件 -->
<template>
  <div class="hello">
    子组件:
    <div v-if="person">
      姓名:{{person.name}}<br/>
      年龄:{{person.age}}<br/>
      性别:{{person.sex}}<br/>
    </div>
    <button @click="addToCount(person)">点击emit</button>
    <button @click="delToCount($event)">点击del emit</button>
  </div>
</template>
 
<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
 
type Person = {name: string; age: number; sex: string };
 
@Component
export default class PropComponent extends Vue {
  private name: string | undefined;
 
  private age: number | undefined;
 
  private person: Person = { name: '我是子组件的张三', age: 1, sex: '男' };
 
  @Prop(String) readonly sex: string | undefined;
 
  @Emit('delemit') private delEmitClick(event: MouseEvent) {}
 
  @Emit() // 如果此处不设置别名字,则默认使用下面的函数命名
  addToCount(p: Person) { // 此处命名如果有大写字母则需要用横线隔开  @add-to-count
    return this.person; // 此处不return,则会默认使用括号里的参数p;
  }
 
  delToCount(event: MouseEvent) {
    this.delEmitClick(event);
  }
}
</script>
```

### **@Ref**
```ts
/**
 * @refKey: string，元素或子组件上定义的的ref值
 */
@Ref(refKey?: string)
```
如果没有提供第一个参数，会使用装饰器后面的属性名充当参数
```vue
<template>
  <div class="PropSync">
    <button @click="getRef()" ref="aButton">获取ref</button>
    <RefComponent name="names" ref="RefComponent"></RefComponent>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import RefComponent from '@/components/RefComponent.vue';

@Component({
  components: { RefComponent },
})
export default class RefPage extends Vue {
  @Ref('RefComponent') readonly RefC!: RefComponent;
  @Ref() readonly aButton!: HTMLButtonElement;
  getRef() {
    console.log(this.RefC);
    console.log(this.aButton);
  }
}
</script>
```

### **@Provide/@Inject**
> @Provide 注入监听值
> @Inject 获取监听值
```ts
/**
 * @key?: 参数名
 */
@Provide(key?: string | symbol)

/**
 * @options?: {
 *     from?: 传递关键字（InjectKey）
 *     default?: 默认值
 * } | InjectKey：传递关键字
 */
@Inject(options?: { from?: InjectKey, default?: any } | InjectKey)
```
```ts
import { Component, Inject, Provide, Vue } from 'vue-property-decorator'

const symbol = Symbol('baz')

@Component
export class MyComponent extends Vue {
  @Inject() readonly foo!: string
  @Inject('bar') readonly bar!: string
  @Inject({ from: 'optional', default: 'default' }) readonly optional!: string
  @Inject(symbol) readonly baz!: string

  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'
}
```
等同于
```ts
const symbol = Symbol('baz')

export const MyComponent = Vue.extend({
  inject: {
    foo: 'foo',
    bar: 'bar',
    optional: { from: 'optional', default: 'default' },
    [symbol]: symbol
  },
  data() {
    return {
      foo: 'foo',
      baz: 'bar'
    }
  },
  provide() {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
})
```

### **@ProvideReactive/@InjectReactive**
```ts
/**
 * @key?: 参数名
 */
@ProvideReactive(key?: string | symbol)


/**
 * @options?: {
 *     from?: 传递关键字（InjectKey）
 *     default?: 默认值
 * } | InjectKey：传递关键字
 */
@InjectReactive(options?: { from?: InjectKey, default?: any } | InjectKey)
```
这两个修饰器是`@Provide` 和 `@Inject` 的响应式版本. 如果一个被提供的值被父组件修改, 子组件可以监听到这个修改
```ts
const key = Symbol()
@Component
class ParentComponent extends Vue {
  @ProvideReactive() one = 'value'
  @ProvideReactive(key) two = 'value'
}

@Component
class ChildComponent extends Vue {
  @InjectReactive() one!: string
  @InjectReactive(key) two!: string
}
```