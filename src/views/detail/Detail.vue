<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailnav"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info :imagesInfo="detailInfo" @imgLoad="imageLoad" />
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"> </goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComps/DetailNavBar.vue";
import DetailSwiper from "views/detail/childComps/DetailSwiper.vue";
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo.vue";
import DetailShopInfo from "views/detail/childComps/DetailShopInfo.vue";
import DetailImagesInfo from "views/detail/childComps/DetailImagesInfo.vue";
import DetailParamInfo from "views/detail/childComps/DetailParamInfo.vue";
import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo.vue";
import DetailBottomBar from "views/detail/childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";

import GoodsList from "components/content/goods/GoodsList.vue";
import { debounce } from "common/utils.js";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

import { itemListenerMixin, backTopMixin } from "common/mixin.js";

import { mapActions } from "vuex";

export default {
  name: "Detail", //App.vue里面exclude的name对应
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailParamInfo,
    DetailImagesInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    //1. 保存传入的iid
    this.iid = this.$route.params.iid; //这个地方的iid需要与路由那的一致：this.$route.query.iid
    //2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      //获取商品信息
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取商家信息
      this.shop = new Shop(data.shopInfo);

      //保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3. 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // //渲染出来后再调用该函数
    // //值不对：图片没有计算在内
    // this.$nextTick(() => {
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // });

    //4 给getThemeTopY赋值,（对给this.themeTopYs赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {},
  updated() {},
  destroyed() {
    //离开页面时取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),

    imageLoad() {
      //方法一
      // this.$refs.scroll.refresh();
      //方法二
      this.newRefresh();

      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      const currentY = -position.y;
      let len = this.themeTopYs.length;
      for (let i = 0; i < len - 1; i++) {
        //小Tips:this.currentIndex!=i
        //方法一：普通做法
        // if (
        //   (this.currentIndex != i &&
        //     i < len - 1 &&
        //     currentY >= this.themeTopYs[i] &&
        //     currentY < this.themeTopYs[i + 1]) ||
        //   (i == len - 1 && currentY >= this.themeTopYs[i])
        // ) {
        //   console.log(i);
        //   this.currentIndex = i;
        //   this.$refs.detailnav.currentIndex=this.currentIndex;
        // }

        //hack做法
        if (
          this.currentIndex !== i &&
          currentY >= this.themeTopYs[i] &&
          currentY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = this.currentIndex;
        }
      }
      //是否显示回到顶部：函数内部不能采用mixin抽取
      this.isShowBackTop = position.y < -1000;
    },
    addToCart() {
      //1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2. 将商品添加到购物车里 Vuex:dispatch调用actions函数返回Promise
      this.addCart(product)
        .then((res) => {
          this.$toast.show(res, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 40px);
}
</style>