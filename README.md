# supermall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 划分目录结构

```txt
-src---------------------------
|
|--assets   :资源文件夹
|    |---css:css文件
|    |    |----base.css 项目基本的css样式
|    |    |----normalize.css 归一化样式结构
|    |---img:img图片
|
|--common   :公共文件夹
|
|--components : 组件
|    |---common: 公共组件（业务无关）
|    |---content:内容组件（业务相关）
|
|--network    :网络相关
|
|--router	  :路由
|
|--store  	  :vuex仓库
|
|--views      :视图(模块划分)


vue.config.js:全局配置（别名）

```

> ref如果是绑定在组件中的，那么通过`this.$refs.refname`获取到的是一个组件对象
>
> ref如果是绑定在普通的元素中的，那么通过`this.$refs.refname`获取到的是一个元素对象

`vh -> viewpointer height`

修饰`.native`修饰什么时候使用？

- 在我们需要监听一个组件的原生事件时，必须给对应的事件加上`.native`修饰符



## 七、解决首页中可滚动区域的问题

Better-Scroll在决定由多少区域可以滚动时，是根据`ScrollerHeigh`属性决定

- `scrollerHeight`属性是根据放Better-Scroll的content中的子组件的高度
- 但是我们的首页中，刚开始在计算`scrollerHeight`属性时，是没有将图片计算在内
- 所以，计算出来的答案是错误的
- 后来图片加载进来之后有了新的高度，但是`scrollerHieght`属性并没有进行更新
- 所以滚动出现了问题

### 怎么解决这个问题？

- 监听每一张图片是否加载完成，只要有一张图片加载完成了，执行一次`refresh()`
- 如何监听图片加载完成了？
  - 原生的`js`监听图片: `img.onload=function(){}`
  - `Vue`中监听: `@load='方法名'`

### 如何将`GoodsListItem.vue`中的事件传入到`Home.vue`中

- 因为涉及到非父子组件的通信，所以这里我们选择了事件总线
  - bus->总线
  - `Vue.prototype.$bus=new Vue();`
  - `this.$bus.emit('事件名称',参数)`
  - `this.$bus.on('事件名称',回调函数)`

### 对于refresh非常频繁的问题，进行防抖操作

- 防抖debounce/节流throttle
- 防抖函数起作用的过程：
  - 如果我们直接执行refresh,那么refresh函数会被执行30次
  - 可以将refresh函数传入到debounce函数中，生成一个新的函数
  - 之后在调用频繁的时候，就使用新生成的函数
  - 而新生成的函数，并不会非常频繁的调用，如果下一次调用非常快，会删除上一个定时器

```js
debounce(func,delay){
    let timer = null;

    return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
}
```

## 八、上拉加载更多的功能

- 监听滚动到底部

## 九、tabControl的吸顶效果

### 9.1 获取到tabControl的offsetTop

- 必须知道滚动到多少时，开始有吸顶效果，这个时候就需要获取`tabControl`的`offsetTop`
- 但是，如果直接在mounted中获取tabControl的offsetTop,那么值是不正确的
- 如何获取正确的值？
  - 监听HomeSwiper中Img的加载完成
  - 加载完成后，发出事件，在Home.vue中，获取正确的值
  - 补充：
    - 为了不让HomeSwiper多次发出事件
    - 可以使用isLoad的变量进行状态记录
    - 注意：这里不进行多次调用和debounce的区别

### 9.2监听滚动，动态的改变tabControl的样式

- 问题：动态的改变tabControl的样式时，会出现两个问题：
  - 问题一：下面的商品内容，会突然上移
  - 问题二：tabControl虽然设置了fixed，但是也随着Better-Scroll一起滚出去
- 其他方案来解决停留问题
  - 在最上面，多复制一份`PlaceHolder TabControl`组件对象，利用它来实现停留效果
  - 当用户滚动到一定位置时，`PlaceHolder TabControl`显示出来
  - 当用户滚动没有达到一定位置时，`PlaceHolder TabControl`隐藏起来



## 十、让Home保持原来的状态

### 10.1让Home不要随意销毁掉

- keep-alive

### 10.2让Home中的内容保持原来的位置

- 离开时，保存一个位置信息`saveY`
- 进来时，将位置设置为原来保存的位置`saveY`信息即可
  - 注意：最好回来时，进行一次`refresh()`