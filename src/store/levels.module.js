
import _camelCase from 'lodash/camelCase';

import Ailment from '@classes/ailment.class';
import CellCohesion from '@classes/levels/cell-cohesion.class';
import Collagen from '@classes/levels/collagen.class';
import Histamines from '@classes/levels/histamines.class';
import HypochlorousAcid from '@classes/levels/hypochlorous-acid.class';
import Interferon from '@classes/levels/interferon.class';
import Lymphocytes from '@classes/levels/lymphocytes.class';

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
    updateLevel: function updateLevel(context, data) {
      if (!data.levelKey || !data.method) return;

      context.commit('mutateLevel', data);
    }
  }
}

function buildMutations() {
  return {
    mutateLevel: function mutateLevel(state, data) {
      console.log('mutateLevel', state, data.levelKey, data.method);
      state.all[data.levelKey][data.method]();
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
  var level = defaultLevels[levelName];
  levels[levelName] = new level.Class(level.props);

  return levelNames.length
    ? _buildLevels(levels, defaultLevels, levelNames)
    : levels;
}

function _buildDefaultLevels() {
  return {
    cellCohesion: {
      Class: CellCohesion,
      props: {
        ailment: new Ailment({ name: 'Radiocytosis' }),
        condition: 1,
        critical: 'Anaphase',
        name: 'Cell Cohesion',
        stable: 'Intact'
      }
    },
    collagen: {
      Class: Collagen,
      props: {
        ailment: new Ailment({ name: 'Scurvy' }),
        condition: 1,
        critical: 'Pirate',
        name: 'Collagen'
      }
    },
    histamines: {
      Class: Histamines,
      props: {
        ailment: new Ailment({ name: 'Rhinitis' }),
        condition: 1,
        critical: 'Some',
        name: 'Histamines',
        stable: 'None'
      }
    },
    hypochlorousAcid: {
      Class: HypochlorousAcid,
      props: {
        ailment: new Ailment({ name: 'Bactolepsis' }),
        condition: 1,
        name: 'Hypochlorous Acid'
      }
    },
    interferon: {
      Class: Interferon,
      props: {
        ailment: new Ailment({ name: 'Viroparesis' }),
        condition: 1,
        name: 'Interferon'
      }
    },
    lymphocytes: {
      Class: Lymphocytes,
      props: {
        ailment: new Ailment({ name: 'Carcinomoly' }),
        condition: 1,
        critical: 'Atypical',
        name: 'Lymphocytes',
        stable: 'Normal'
      }
    }
  };
}
