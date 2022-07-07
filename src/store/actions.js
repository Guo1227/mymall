import { ADD_COUNTER, ADD_TO_CART } from "./mutations-type";

export default {
  addCart(context, payload) {
    //判断
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find((item) => {
        return item.iid == payload.iid;
      });

      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前的商品数量+1");
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve("添加新商品！");
      }
    });
  },
};
