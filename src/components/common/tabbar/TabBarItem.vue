<template>

      <!-- <div class="tab-bar-item">
          <img src="../../assets/img/tabbar/home.svg" alt="">
          <div>
            首页
          </div>
        </div>
         -->
        <!-- 所有的Item都展示同一个图片，同一段文字
            实际上他需要插槽
         -->

         <!-- 监听点击事件 -->
    <div class="tab-bar-item" @click="itemClick">
        <!-- 选择激活的,最好用div来包裹一层 -->
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <!-- 动态修改文字颜色,插槽最终会被替换掉，所以:class的方式会失效,必须要有div的包裹才有效 -->
        <!-- <div :class="{active:isActive}">
             <slot name="item-text"></slot>
        </div> -->
        <!-- 为了能接收父级传来的color（没有动态修改css的说法），只能添加动态style来进行颜色修改 -->
        <div :style="activeStyle">
             <slot name="item-text"></slot>
        </div>
       
        <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div> -->
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props:{ //跳转路径只能依靠外部传入
    path:String,
    activeColor:{
        type:String,
        default:'red'
    }
  },
  data() { 
    return {
        // isActive:false
    }
  },
  computed:{
      isActive(){
          //拿到处于活跃的路由的path

          // /home -> item1(/home) = true
          // /home -> item1(/category) = false
          // /home -> item1(/cart) = false
          // /home -> item1(/profile) = false
          return this.$route.path.indexOf(this.path) !== -1  //没有找到时=-1，找到的时候 不等于-1
      },
      activeStyle(){
          return this.isActive?{color:this.activeColor}:{};
      }
  },
  methods:{
      itemClick(){
          if(this.$route.path === this.path)return;  //防止重复跳转
          this.$router.replace(this.path)
      }
  }
 }
</script>

<style scoped>
  .tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width:24px;
    height:24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  /* .active{
      color:red
  } */
  
  
</style>