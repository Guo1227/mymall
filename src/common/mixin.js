import { debounce } from "common/utils.js";
import BackTop from "components/content/backTop/BackTop.vue";

//两个组件之间复用代码===提取相同的代码
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null,
    };
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
};


//导出混入对象
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backClick() {
      console.log("backClick");
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  },
};
