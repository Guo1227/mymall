<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabControlFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banner="banner"
        @swipperImageLoad="swipperImageLoad"
      ></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="titles"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//公共组件
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

//业务逻辑组件
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home.js";

import { itemListenerMixin, backTopMixin } from "common/mixin.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banner: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      titlesEn: ["pop", "new", "sell"],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabControlFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();

    //请求商品数据
    this.getMainHomeGoods("pop");
    this.getMainHomeGoods("new");
    this.getMainHomeGoods("sell");
  },
  mounted() {
    // //图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // //3. 监听item中图片加载完成,事件总线
    // this.itemImgListener=() => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
    // //获取tabControl的offsetTop
    // //所有组件都有一个属性$el:用于获取组件中的元素
    // // console.log(this.$refs.tabControl.$el);
  },
  destroyed() {
    console.log("销毁");
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // this.$refs.scroll.refresh();
  },
  deactivated() {
    //记得加上小括号，调用函数
    this.saveY = this.$refs.scroll.getScrollY();
    this.$refs.scroll.refresh();

    //离开页面时取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    /*事件监听相关代码 */
    tabClick(index) {
      console.log(index);
      this.currentType = this.titlesEn[index];
      console.log(this.currentType);
      //保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1. 判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop = position.y < -1000;
      //2. tabControl是否吸顶（position：fixed）
      this.isTabControlFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log("上拉加载更多");
      this.getMainHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
      // this.$refs.scroll.scroll.refresh();
    },

    swipperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*网络请求相关 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banner = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getMainHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log("--------------");
        this.goods[type].list.push(...res.data.list); //注意...
        console.log(
          "this.goods " + type + "前30条数据 page=" + this.goods[type].page
        );
        // console.log(this.goods[type].list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  /* 方法一 */
  /* calc减号前后要隔开 */
  /* height: calc(100% - 49px);
  overflow: hidden; */

  /* 方法二 */
  position: absolute;
  bottom: 49px;
  top: 44px;
  left: 0;
  right: 0;
}
</style>