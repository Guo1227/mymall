<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imgLoad" :key="showImage"/>
    <div class="goods-item-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="cfav">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  data() {
    return {};
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("itemImageLoad");
      // if (this.$route.path.indexOf("/home")) {
      //   this.$bus.$emit("homeItemImageLoad");
      // }else if (this.$route.path.indexOf('/detail'))
      // {
      //   this.$bus.$emit("detailItemImageLoad");
      // }
    },
    itemClick() {
      //跳转至详情页
      let aa = this.goodsItem.iid || this.goodsItem.item_id;
      this.$router.push("/detail/" + aa); //this.goodsItem.iid
    },
  },
};
</script>

<style scoped>
.goods-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-item-info {
  font-size: 12px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  overflow: hidden;
  text-align: center;
}

.goods-item-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-item-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-item-info .cfav {
  position: relative;
}

.goods-item-info .cfav::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>