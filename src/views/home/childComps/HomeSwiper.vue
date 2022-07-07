<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//导入轮播图组件
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swipperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
</style>