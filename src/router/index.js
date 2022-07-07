import Vue from "vue";
import VueRouter from "vue-router";
//懒加载
const Home = () =>
  import(/* webpackChunkName: "about" */ "../views/home/Home.vue");
const Category = () => import("../views/category/Category.vue");
const Shopcart = () => import("../views/shopcart/Shopcart.vue");
const Profile = () => import("../views/profile/Profile.vue");
const Detail = () => import("../views/detail/Detail");

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/category",
    name: "category",
    component: Category,
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: Shopcart,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/detail/:iid",
    name: "detail", //暂时没用到
    component: Detail,
  },
  // // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
