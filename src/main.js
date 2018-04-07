
import Vue from 'vue';

import Router from '@router/router';
import Store  from '@store/store';

import VectorDrop6 from './VectorDrop6.vue';

Vue.config.productionTip = false;

new Vue({
  el: '#vector-drop-6',
  components: {
    VectorDrop6: VectorDrop6
  },
  router: Router,
  store: Store,
  template: '<VectorDrop6></VectorDrop6>'
});
