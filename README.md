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