//vuecli3配置alias
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir); //设置绝对路径
}

module.exports = {
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')); //参数1,设置的别名,参数2：设置的路径
    config.resolve.alias.set('components', resolve('src/components'));
    config.resolve.alias.set('assets', resolve('src/assets'));
    config.resolve.alias.set('router', resolve('src/router'));
    config.resolve.alias.set('store', resolve('src/store'));
    config.resolve.alias.set('network', resolve('src/network'));
  },
};
