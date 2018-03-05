
import { mapState } from 'vuex';

import _kebabCase   from 'lodash/kebabCase';

export default {
  name: 'CinematicComponent',

  computed: {
    ...mapState({
      stageName: function imgSrc(state) {
        return _kebabCase(state.stages.active);
      }
    }),

    imgSrc: function imgSrc() {
      return `static/img/stage/${this.stageName}/${this.screen.img}`;
    }
  },

  data: function data() {
    return {

    };
  },

  mounted: function mounted() {
    console.info('Cinemtic initialized', this);
  },

  props: [
    'screen'
  ]
}
