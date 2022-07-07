<template>
  <div class="cart-list">
    <!-- <ul>
      <li v-for="item in shopCartList">{{ item }}</li>
    </ul> -->
    <cart-list-item
      v-for="(item, index) in shopCartList"
      :key="index"
      :itemInfo="item"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  computed: {
    ...mapGetters(["shopCartList"]),
  },
  components: {
    CartListItem,
  },
};
</script>

<style scoped>
</style>