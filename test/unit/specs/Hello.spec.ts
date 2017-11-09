import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    var Constructor = Vue.extend(HelloWorld);
    var vm = new Constructor().$mount();

    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Hello Vector Drop 6');
  })
})
