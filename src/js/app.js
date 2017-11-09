
import PlayerService from './component/player/player.service.js';

import router from './app/router.vue';

class VD6 {
  constructor() {
    this.init();
  }

  static name() {
    return 'Vector Drop 6';
  }

  init() {
    this.playerService = new PlayerService({
      playerId: '0123'
    });

    this.app = new Vue({
      el: '#vector-drop-6',
      mounted: onMounted.bind(this),
      router: router
    });
  }
}

window.vd6 = new VD6({});

function onMounted() {
  this.playerService.init();
}
