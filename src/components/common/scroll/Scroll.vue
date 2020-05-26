<template>
<!-- ref 拿到某个组件 -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props:{
      probeType:{
          type:Number,
          default:0
      },
      pullUpLoad:{
          type:Boolean,
          default:false
      }
  },
  data(){
      return {
          scroll:null
      }
  },
  mounted(){
    //   尽量通过this.$refs.refname获取元素
      this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,  //为3时监听滚动
          pullUpLoad:this.pullUpLoad   //监听上啦事件
      });

      //2.监听滚动的位置
      this.scroll.on('scroll',(position)=>{
        // console.log(position)
        this.$emit('scroll',position);
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
      })
  },
  methods:{
      scrollTo(x,y,time=300){
          this.scroll.scrollTo(x,y,time);
      },
    //   完成上啦，主动调用这个方法，下次才能上啦
      finishPullUp(){
          this.scroll.finishPullUp();
      }
  }
 }
</script>

<style  scoped>
  
  
  
</style>