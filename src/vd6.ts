
import Vue        from 'vue';
import Component  from 'vue-class-component';

import cScoreBoard from './components/score-board/c-score-board.vue';

@Component({
  name: 'VD6',
  components: {
    'score-board': cScoreBoard
  }
})

class VD6 extends Vue {
  player: {
    id: String
  } = {
    id: '0000'
  };
};

export default VD6;
