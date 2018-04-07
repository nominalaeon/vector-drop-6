
import { mapState } from 'vuex';

import _kebabCase   from 'lodash/kebabCase';

export default {
  name: 'CinematicComponent',

  computed: {
    ...mapState({
      stageName: function mapStageName(state) {
        return _kebabCase(state.stages.active);
      }
    }),

    imgSrc: function buildImgSrc() {
      return `static/img/stage/${this.stageName}/${this.screen.img}`;
    }
  },

  data: function buildData() {
    return {

    };
  },

  mounted: function onMounted() {
    console.info('Cinemtic initialized', this);
  },

  props: [
    'screen'
  ]
}
