
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
      activeDrops: function activeDrop(state) {
        return state.drops.active;
      },
      hasAlchemistPerk: function hasAlchemistPerk(state) {
        return state.player.perks.includes('alchemist');
      },
      dropNames: function dropNames(state) {
        return Object.keys(state.drops.all);
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
  var randomMethod = _random(0, 1) ? 'increase' : 'decrease';

  this.levels.collagen.increase();

  if (this.levels.hypochlorousAcid.condition !== this.levels.hypochlorousAcid.threshold.max) {
    this.levels.hypochlorousAcid[randomMethod]();
  }

  console.info('OmegaPhase onUpdateLoops', this.levels.hypochlorousAcid, randomMethod);
}

function resetActiveDrop() {
  var dropCount = this.dropNames.length ? (this.dropNames.length - 1) : 0;
  var index = _random(0, dropCount);

  this.$store.dispatch('updateDropsActive', {
    method: 'add',
    name: this.dropNames[index]
  });
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
