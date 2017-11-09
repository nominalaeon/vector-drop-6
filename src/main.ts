
import Vue from 'vue'
import VD6 from './VD6.vue'

import router from './router/router'
import store  from './store/store'

Vue.config.productionTip = false

new Vue({
  el: '#vector-drop-6',
  components: {
    VD6: VD6
  },
  router: router,
  store: store,
  template: '<VD6></VD6>'
});
