import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import FastClick from "fastclick";

import "@/utils/rem.js";

import VueLazyload from "vue-lazyload"; //与vant效果一致
// import vant from "vant";
// import "vant/lib/index.css";
// import { Lazyload } from "vant";

import toast from "components/common/toast";

Vue.config.productionTip = false;
//添加事件总线对象
Vue.prototype.$bus = new Vue();

//安装toast插件
Vue.use(toast);

FastClick.attach(document.body);

// Vue.use(vant);
//使用懒加载的插件
Vue.use(VueLazyload, {
  loading: require("assets/img/common/placeholder.png"),
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
