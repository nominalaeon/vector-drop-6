
import Vue from 'vue';

import router from './router/router';
import store  from './store/store';

import VectorDrop6 from './VectorDrop6.vue';

Vue.config.productionTip = false;

new Vue({
  el: '#vector-drop-6',
  components: {
    VectorDrop6: VectorDrop6
  },
  router: router,
  store: store,
  template: '<VectorDrop6></VectorDrop6>'
});
