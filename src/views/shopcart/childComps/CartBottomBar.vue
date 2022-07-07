<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-button
        class="check-btn"
        :isChecked="isSelectedAll"
        @click.native="clickSelectAll"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="total-price">合计：{{ totalPrice }}</div>

    <div class="buy" @click="calcClick">去结算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartBottonBar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cartList: "shopCartList",
      cartLength: "cartLength",
    }),
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((prevalue, item) => {
            return prevalue + item.price * item.count;
          }, 0)
      );
    },
    checkedLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectedAll() {
      if (this.cartLength === 0) return false;
      // return !this.cartList.filter((item) => !item.checked).length;//方法1
      // return !this.cartList.find((item) => !item.checked); //性能稍微高一点，方法2

      //方法3
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    clickSelectAll() {
      if (this.isSelectedAll) {
        //全部选中
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        //部分或全部不选中
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (this.cartLength == 0) {
        this.$toast.show('请选择要结算的商品！')
        console.log("请选择要结算的商品！");
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 40px;
  line-height: 40px;
  display: flex;

  font-size:15px;
}
.check-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total-price {
  margin-left: 25px;
}
.buy {
  width: 100px;
  margin-left: auto;
  margin-right: 0px;
  background-color: red;
  text-align: center;
  color: #fff;
}
</style>