<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',

}
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  /* 阴影 */
  box-shadow: 0px -3px 1px rgba(100, 100, 100, 0.1);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  /* margin: 0px; */
  margin-bottom: 2px;
}
</style>