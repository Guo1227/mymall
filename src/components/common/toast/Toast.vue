<template>
  <div class="toast" v-show="isShowToast">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShowToast: false,
    };
  },
  methods: {
    show(message = "弹窗文字", duration = 2000) {
      console.log(message);
      //duration=duration||2000;
      this.isShowToast = true;
      this.message = message;

      setTimeout(() => {
        this.isShowToast = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 经典水平垂直居中 */
  padding: 8px 10px;
  z-index: 999;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 5%;

  font-size:12px;
}
</style>