<template>
  <!-- ref/children一般绑定给子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },

  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    //1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      observeDOM: true,
      observeImage: true,
      click: true,
      pullUpLoad: this.pullUpLoad,
    });
    //2. 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    //3. 监听上拉事件
    //判断语句可写可不写
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }

    this.scroll.refresh(); //与observeDom：true一直
  },
  methods: {
    scrollTo(x, y, time = 500) {
      //判断this.scroll
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //等待数据请求完成，并且将新的数据展示出来
    finishPullUp() {
      this.scroll.finishPullUp();
      // this.refresh();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>