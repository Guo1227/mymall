import axios from "axios";

export function request(config) {
  //1. 创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000,
  });
  //2. axios拦截器(全局和局部)
  //2.1 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // console.log(config);
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  //2.2 响应拦截
  instance.interceptors.response.use(
    (res) => {
      // console.log(res);
      return res.data; //返回data即可
    },
    (err) => {
      console.log(err);
    }
  );

  //3. 发送真正的网络请求//函数本身返回promise
  return instance(config);
}
