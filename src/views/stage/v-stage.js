
import { mapState }   from 'vuex';

import Stage        from '@classes/stage.class';

import cGridOverlay from '@components/grid-overlay/grid-overlay.vue';

import sOmegaPhase  from '@stages/omega-phase/omega-phase.vue';

export default {
  name: 'StageComponent',

  components: {
    'grid-overlay': cGridOverlay,
    'omega-phase': sOmegaPhase
  },

  computed: {
    ...mapState({
      stage: function stage(state) {
        return state.stages.all[state.stages.active] || new Stage({});
      }
    }),
    componentName: function stageName() {
      return this.$route.params.stage || '';
    },
  },

  created: function created() {
    this.$store.dispatch('updateActiveStage', this.componentName);
  },

  data: function data() {
    return {

    }
  },

  methods: {

  },

  mounted: function mounted() {
    console.info('Stage mounted', this);
  }
}

/**
 * General methods
 */
