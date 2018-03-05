
import { mapGetters, mapState } from 'vuex';

import _random from 'lodash/random';

// import cActiveDrop  from '@components/active-drop/active-drop.vue';
import cCinematic   from '@components/cinematic/cinematic.vue';
import cLevels      from '@components/levels/levels.vue';
import cPatient     from '@components/patient/patient.vue';
import cReadyTrays  from '@components/ready-trays/ready-trays.vue';
import cStatus      from '@components/status/status.vue';

export default {
  name: 'OmegaPhase',

  components: {
    // 'active-drop': cActiveDrop,
    'cinematic': cCinematic,
    'levels': cLevels,
    'patient': cPatient,
    'ready-trays': cReadyTrays,
    'status': cStatus
  },

  computed: {
    ...mapGetters([
      'loops',
      'tempo'
    ]),
    ...mapState({
      activeDrop: function activeDrop(state) {
        return state.drops.active;
      },
      hasAlchemistPerk: function hasAlchemistPerk(state) {
        return state.player.perks.includes('alchemist');
      },
      drops: function drops(state) {
        return state.drops.all;
      },
      levels: function levels(state) {
        return state.levels.all;
      },
      threshold: function threshold(state) {
        return state.game.threshold;
      }
    })
  },

  created: function created() {
    this._vm = {};

    let stageData = {
      dispatch: this.$store.dispatch,
      tempo: this.tempo
    };

    this.stage.init(stageData)
      .then(this.updateThresholds)
      .then(this.startGameTimer);
  },

  data: function data() {
    return {};
  },

  methods: {
    onUpdateLoops: onUpdateLoops,
    resetActiveDrop: resetActiveDrop,
    startGameTimer: startGameTimer,
    updateThreshold: updateThreshold,
    updateThresholds: updateThresholds
  },

  mounted: function mounted() {
    this.resetActiveDrop();

    console.info('OmegaPhase mounted', this);
  },

  props: [
    'stage'
  ],

  watch: {
    loops: onUpdateLoops
  }
};

/**
 * General methods
 */

function onUpdateLoops() {
  console.info('OmegaPhase watch loops', this);
  this.$store.dispatch('increaseLevel', 'collagen');
  // this.forceUpdate();
}

function resetActiveDrop() {
  var dropKeys = Object.keys(this.drops);
  var dropCount = dropKeys.length ? (dropKeys.length - 1) : 0;
  var index = _random(0, dropCount);

  this.$store.dispatch('updateActiveDrop', dropKeys[index]);
}

function startGameTimer() {
  this.$store.dispatch('resetGameTimer');
  this.$store.dispatch('startGameTimer');
}

function updateThreshold(type, threshold) {
  this.$store.dispatch('updateGameThreshold', {
    threshold: threshold,
    type: type
  });
}

function updateThresholds() {
  this.updateThreshold(...['pain', 3]);
  this.updateThreshold(...['progress', 3]);
  this.updateThreshold(...['readyTrays', 3]);
  this.updateThreshold(...['timer', 3000]);
}

/**
 * Private utility methods
 */
