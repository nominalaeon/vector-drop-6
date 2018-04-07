
import { mapState }   from 'vuex';

import Stage        from '@classes/stage.class';

import patternGridOverlay from '@patterns/grid-overlay/grid-overlay.vue';

import stageOmegaPhase  from '@stages/omega-phase/omega-phase.vue';

export default {
  name: 'StageComponent',

  components: {
    'grid-overlay': patternGridOverlay,
    'omega-phase': stageOmegaPhase
  },

  computed: {
    ...mapState({
      stage: function mapStage(state) {
        return state.stages.all[state.stages.active] || new Stage({});
      }
    }),
    componentName: function buildComponentName() {
      return this.$route.params.stage || '';
    },
  },

  created: function onCreated() {
    this.$store.dispatch('updateActiveStage', this.componentName);
  },

  data: function buildData() {
    return {

    }
  },

  methods: {

  },

  mounted: function onMounted() {
    console.info('Stage mounted', this);
  }
}

/**
 * MapState methods
 */

/**
 * General methods
 */
