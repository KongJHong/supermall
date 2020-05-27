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
          probeType:this.probeType,  //0/1/2(手指滚动，没有惯性)/3 为3时监听全部滚动
          pullUpLoad:this.pullUpLoad   //监听上啦事件
      });

      //2.监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll',(position)=>{
                this.$emit('scroll',position);
            })
      }
      

      //3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
        })
      }
      
  },
  methods:{
        scrollTo(x,y,time=300){
          this.scroll && this.scroll.scrollTo(x,y,time);
        },
        //   完成上啦，主动调用这个方法，下次才能上啦
        finishPullUp(){
          this.scroll.finishPullUp();
        },
        refresh(){
            this.scroll && this.scroll.refresh();
        },
        getScrollY(){
            return this.scroll? this.scroll.y : 0;
        }
  }
 }
</script>

<style  scoped>
  
  
  
</style>