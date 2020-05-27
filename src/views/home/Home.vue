<template>
  <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <tab-control @tabClick="tabClick" 
                      :titles="['流行','新款','精选']" 
                      ref="tabControl1"
                      class="tab-control"
                      v-show="isTabFixed"></tab-control>
      <scroll class="content" 
              ref="scroll" 
              :probe-type="3" 
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore"
              >
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control @tabClick="tabClick" 
                      :titles="['流行','新款','精选']" 
                      ref="tabControl2"></tab-control>
        <good-list :goods="showGoods"></good-list>
      </scroll>

      <!-- 组件本身不能监听点击事件,只有click.native才可以 -->
      <!-- <back-top @click="backClick"></back-top> -->
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

//公共组件
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodList from 'components/content/goods/GoodsList';
import BackTop from 'components/common/backTop/BackTop';
import Scroll from 'components/common/scroll/Scroll'

// 工具
import {getHomeMultidata,getHomeGoods} from 'network/home';
import {debounce} from 'common/utils'


export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{  //首页展示的数据
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:true,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  // 这两个函数必须在keep alive模式下才能用
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh();//可能有一些小问题，
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY();
    console.log(this.saveY)
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    //1.监听item中图片加载完成  $bus事件总线在main.js中初始化
    //this.$refs.scroll.refresh是函数 this.$refs.scroll.refresh()是传入函数的返回值
    const refresh = debounce(this.$refs.scroll.refresh,500)

    this.$bus.$on("itemImageLoad",()=>{
      refresh();
    })
  },
  methods:{
    /**
     * 事件监听相关方法
     */
    tabClick(index){
      
      switch(index){
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      // this.$refs.scroll相当于获得上面的scroll组件
      //scroll.scroll相当于获取组件中的scroll变量
      this.$refs.scroll.scrollTo(0,0,500);
    },
    //滚动事件
    contentScroll(position){
      //1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000;

      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    //上啦加载更多
    loadMore(){
      // console.log("---------------------------------")
      this.getHomeGoods(this.currentType)

      // 重新计算可滚动的区域
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad(){
      // 2.获取tabControl的offetTop
      //所有的组件都有一个属性$el,用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata(){
      getHomeMultidata()
      .then(res =>{
        this.banners = res.data.banner.list;  //.list变为数组
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res =>{
          //把一个数组塞进另一个数组
          this.goods[type].list.push(...res.data.list)
          //或 this.goods[type].list.concat(res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp();
      });
    }
  }
 }
</script>

<style  scoped>

  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }


  .home-nav{
    background-color: var(--color-tint);
    color:#fff;

    /* position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:9; */
  }

/* 没效果了 */
  /* .tab-control{ */
    /* sticky已经不起作用了，因为整个模块交给了scroll管理 */
    /* position:sticky; */
    /* top: 44px; */
    /* z-index: 9;     防止遮挡 */
  /* } */

  /* scoped是有作用域的 */
  .content{
    /* height:300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom:49px;
    left: 0;
    right: 0;
  }

  /* .content{
    height: calc(100%-93px) ;
    overflow: hidden;
    margin-top: 44px;
  } */
  
  .tab-control{
    position: relative;
    z-index: 9  ;
  }
  
</style>