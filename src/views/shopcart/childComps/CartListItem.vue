<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :isChecked="itemInfo.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.shop-item:last-child {
  border-bottom: 0;
}

.item-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}

.item-info {
  font-size: 17px;
  position: relative;
  overflow: hidden;
  width: 88%;
  padding: 5px 10px;
  color: #333333;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: #ff4500;
}

.cart-bottom-bar {
  font-size: 15px;
  position: fixed;
  right: 0;
  bottom: 50px;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #cccccc;
}

.cart-bottom-price {
  margin-left: 50px;
}

.cart-bottom-price span {
  color: red;
}

.cart-bottom-btn button {
  line-height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: block;
  height: 50px;
  padding: 0 15px;
  color: white;
  border: 0;
  outline: none;
  background: linear-gradient(to right, #ff6034, #ee0a24);
}

.cart-bottom-btn button:active {
  opacity: 0.8;
}
</style>