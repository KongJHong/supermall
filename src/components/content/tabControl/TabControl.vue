<template>
  <div class="tab-control">
      <!-- 没必要用插槽，因为只是文字内容不同 -->
      <div v-for="(item,index) in titles" 
            :key="index" 
            class="tab-control-item" 
            :class="{active:index===currentIndex}"
            @click="itemClick(index)"
            >
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props:{
      titles:{
          type:Array,
          default(){
              return [];
          }
      }
  },
  data(){
      return {
          currentIndex:0
      }
  },
  methods:{
      itemClick(index){
          this.currentIndex = index;
          //传出去点击事件
          this.$emit('tabClick',index);
      }
  }
 }
</script>

<style  scoped>
  .tab-control{
      display: flex;
      text-align: center;
      font-size: 15px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
  }
  
  .tab-control-item{
      flex:1;
      
  }

  .tab-control-item span{
      padding: 5px;
  }

  .active{
    color:var(--color-high-text);    
  }

  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
  
</style>