
import { mapGetters, mapState } from 'vuex';

import _random from 'lodash/random';

// import patternActiveDrop  from '@patterns/active-drop/active-drop.vue';
import patternCinematic   from '@patterns/cinematic/cinematic.vue';
import patternLevels      from '@patterns/levels/levels.vue';
import patternPatient     from '@patterns/patient/patient.vue';
import patternReadyTrays  from '@patterns/ready-trays/ready-trays.vue';
import patternStatus      from '@patterns/status/status.vue';

export default {
  name: 'OmegaPhase',

  components: {
    // 'active-drop': patternActiveDrop,
    'cinematic': patternCinematic,
    'levels': patternLevels,
    'patient': patternPatient,
    'ready-trays': patternReadyTrays,
    'status': patternStatus
  },

  computed: {
    ...mapGetters([
      'loops',
      'tempo'
    ]),

    ...mapState({
      hasAlchemistPerk: function mapHasAlchemistPerk(state) {
        return state.player.perks.includes('alchemist');
      },
      levels: function mapLevels(state) {
        return state.levels.all;
      },
      pain: function mapPain(state) {
        return state.game.pain;
      },
      points: function mapPoints(state) {
        return state.score.points;
      },
      progress: function mapProgress(state) {
        return state.game.progress;
      },
      threshold: function mapGameThreshold(state) {
        return state.game.threshold;
      }
    })
  },

  created: function onCreated() {
    this._vm = {};

    let stageData = {
      dispatch: this.$store.dispatch,
      tempo: this.tempo
    };

    this.stage.init(stageData)
      .then(this.updateThresholds)
      .then(this.startGameTimer);
  },

  data: function buildData() {
    return {};
  },

  methods: {
    onCure: onCure,
    onUpdateLoops: onUpdateLoops,
    startGameTimer: startGameTimer,
    updateLevels: updateLevels,
    updatePain: updatePain,
    updateProgress: updateProgress,
    updateScore: updateScore,
    updateThreshold: updateThreshold,
    updateThresholds: updateThresholds
  },

  mounted: function onMounted() {
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

function onCure(levelName) {
  var level = this.levels[levelName];

  if (!level || !level.isBloomed) return;

  this.updateScore('levelCured');

  this.levels[levelName].cure();
}

function onUpdateLoops() {
  this.updateLevels();
  this.updatePain();
  this.updateProgress();
}

function startGameTimer() {
  this.$store.dispatch('resetGameTimer');
  this.$store.dispatch('startGameTimer');
}

function updateLevels() {
  var randomLevelName = _buildRandomLevelName(Object.keys(this.levels));
  var randomMethod = _buildRandomMethod();

  this.$store.dispatch('updateLevel', {
    levelKey: 'collagen',
    method: 'increase'
  });

  if (this.levels.hypochlorousAcid.threshold.max > this.levels.hypochlorousAcid.condition) {
    this.$store.dispatch('updateLevel', {
      levelKey: 'hypochlorousAcid',
      method: randomMethod
    });
  }

  randomMethod = _buildRandomMethod();

  if (this.levels[randomLevelName].threshold.max > this.levels[randomLevelName].condition) {
    this.$store.dispatch('updateLevel', {
      levelKey: randomLevelName,
      method: randomMethod
    });
  }
}

function updatePain() {
  var painCount = _countLevelBlooms(0, this.levels, Object.keys(this.levels));

  this.$store.dispatch('updateGamePain', painCount);
}

function updateProgress() {
  this.$store.dispatch('updateGameProgress', 1);
}

function updateScore(type) {
  var points = this.points[type];

  if (!points) return;

  this.$store.dispatch('updatePlayerScore', points);
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

function _buildRandomLevelName(levelNames) {
  var index = _random(0, levelNames.length - 1);

  console.log('randomLevelName', levelNames[index]);
  return levelNames[index];
}

function _buildRandomMethod() {
  var methods = ['decrease', 'increase', 'reset'];
  var index = _random(0, methods.length - 1);

  return methods[index];
}

function _countLevelBlooms(count, levels, [key, ...keys]) {
  var level = levels[key];

  if (!level) return count;

  if (level.isBloomed) {
    count = count + 1;
  }

  return keys.length
    ? _countLevelBlooms(count, levels, keys)
    : count;
}
