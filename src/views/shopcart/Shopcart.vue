<template>
  <div class="shop-cart">
    <!-- 导航栏 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <scroll ref="scroll" class="content" :probeType="3">
      <!-- 商品的列表 -->
      <cart-list />
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import CartList from "./childComps/CartList";
import { mapGetters } from "vuex";

//将store的getters映射到局部计算属
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  computed: {
    // ...mapGetters(["cartLength","shopCartList"]),
    //更改名称，采用对象
    ...mapGetters({
      length: "cartLength",
    }),
  },
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar,
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.shop-cart {
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  position: relative;
  z-index: 9;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>