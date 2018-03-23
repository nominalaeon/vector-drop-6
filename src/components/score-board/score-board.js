
import { mapState } from 'vuex';

import _padStart from 'lodash/padStart';

export default {
  name: 'ScoreBoard',

  computed: {
    ...mapState({
      hiScore: function mapHiScore(state) {
        return _padStart(state.score.hiScore.toString(), 4, '0');
      },
      id: function mapPlayerId(state) {
        return state.player.id;
      },
      score: function mapPlayerScore(state) {
        return _padStart(state.player.score.toString(), 4, '0');
      }
    })
  },

  data: function buildData() {
    return {

    }
  },

  methods: {

  },

  mounted: function onMounted() {
    console.info('ScoreCard mounted', this);
  },

  props: {}
};

/**
 * General methods
 */



/**
 * Private utility methods
 */
