
import Vue from 'vue'

Vue.config.productionTip = false

var context ={
  src: require.context('../../src', true, /^\.\/(?!main(\.js)?$)/),
  test: require.context('./specs', true, /\.spec$/)
};

context.src.keys().forEach(context.src);
context.test.keys().forEach(context.test);
