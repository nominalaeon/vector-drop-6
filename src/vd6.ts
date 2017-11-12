
import Vue          from 'vue';
import Component    from 'vue-class-component';

import cScoreBoard  from './components/score-board/c-score-board.vue';

import * as T       from './types/common';

@Component({
  name: 'VD6',
  components: {
    'score-board': cScoreBoard
  }
})

class VD6 extends Vue {
  player: T.Player = {
    id: '0000',
    score: 0
  };
};

export default VD6;
