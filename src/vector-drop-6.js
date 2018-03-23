
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

import cEffectScreen  from './components/effect-screen/effect-screen.vue';
import cScoreBoard    from './components/score-board/score-board.vue';

export default {
  components: {
    'effect-screen': cEffectScreen,
    'score-board': cScoreBoard
  },

  data: function buildData() {
    return {
      player: {
        id: '0000',
        score: 0
      }
    }
  },

  mounted: function onMounted() {
    console.log('VectorDrop6 initialized', this);
  }
};

/**
 * General methods
 */
