
import { mapState } from 'vuex';

import _padStart from 'lodash/padStart';

export default {
  name: 'ScoreBoard',

  computed: {
    ...mapState({
      hiScore: function hiScore(state) {
        return _padStart(state.score.hiScore.toString(), 4, '0');
      },
      id: function id(state) {
        return state.player.id;
      },
      score: function score(state) {
        return _padStart(state.player.score.toString(), 4, '0');
      }
    })
  },

  data: function data() {
    return {

    }
  },

  methods: {

  },

  mounted: function mounted() {
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
