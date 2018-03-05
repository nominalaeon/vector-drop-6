
import _camelCase from 'lodash/camelCase';

import Ailment from '@classes/ailment.class';
import Level from '@classes/level.class';

export default {
  actions:    buildActions(),
  mutations:  buildMutations(),
  state:      buildState()
};

/**
 * General methods
 */

function buildActions() {
  return {
    increaseLevel: function increaseLevel(context, levelKey) {
      context.commit('increaseLevel', levelKey);
    }
  }
}

function buildMutations() {
  return {
    increaseLevel: function increaseLevel(state, levelKey) {
      state.all[levelKey].increase();
    }
  };
}

function buildState() {
  var defaultLevels = _buildDefaultLevels();

  return {
    all: _buildLevels({}, defaultLevels, Object.keys(defaultLevels))
  };
}

/**
 * Private methods
 */

function _buildLevels(levels, defaultLevels, [levelName, ...levelNames]) {
  levels[levelName] = new Level(defaultLevels[levelName]);

  return levelNames.length
    ? _buildLevels(levels, defaultLevels, levelNames)
    : levels;
}

function _buildDefaultLevels() {
  return {
    cellCohesion: {
      ailment: new Ailment({ name: 'Radiocytosis' }),
      condition: 1,
      critical: 'Anaphase',
      name: 'Cell Cohesion',
      stable: 'intact'
    },
    collagen: {
      ailment: new Ailment({ name: 'Scurvy' }),
      condition: 1,
      critical: 'Pirate',
      name: 'Collagen'
    },
    histamines: {
      ailment: new Ailment({ name: 'Rhinitis' }),
      condition: 1,
      critical: 'Some',
      name: 'Histamines',
      stable: 'None'
    },
    hypochlorousAcid: {
      ailment: new Ailment({ name: 'Bactolepsis' }),
      condition: 1,
      name: 'Hypochlorous Acid'
    },
    interferon: {
      ailment: new Ailment({ name: 'Viroparesis' }),
      condition: 1,
      name: 'Interferon'
    },
    lymphocytes: {
      ailment: new Ailment({ name: 'Carcinomoly' }),
      condition: 1,
      name: 'Lymphocytes'
    }
  };
}
