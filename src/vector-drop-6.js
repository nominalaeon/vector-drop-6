
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

import patternEffectScreen  from '@patterns/effect-screen/effect-screen.vue';
import patternScoreBoard    from '@patterns/score-board/score-board.vue';

export default {
  components: {
    'effect-screen': patternEffectScreen,
    'score-board': patternScoreBoard
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
