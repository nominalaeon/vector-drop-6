
import Vue from 'vue';

import _camelCase from 'lodash/camelCase';
import _random from 'lodash/random';

import Drop from '@classes/drop.class';

export default {
  actions:    buildActions(),
  mutations:  buildMutations(),
  state:      buildState()
};

/**
 * Build methods
 */

function buildActions() {
  return {
    updateDropsActive: updateDropsActive
  }
}

function buildMutations() {
  return {
    addActiveDrop: addActiveDrop,
    removeActiveDrop: removeActiveDrop
  };
}

function buildState() {
  var defaultDrops = _buildDefaultDrops();

  return {
    active: {},
    all: _buildDrops({}, defaultDrops, Object.keys(defaultDrops))
  };
}

/**
 * General methods
 */

function addActiveDrop(state, key) {
  var drop = new Drop(state.all[key]);
  drop.id = key + _random(0, 100);

  Vue.set(state.active, drop.id, drop);
}

function removeActiveDrop(state, dropId) {
  console.log('removeActiveDrop', dropId);
  Vue.delete(state.active, dropId);
}

function updateDropsActive(context, data) {
  context.commit(`${data.method}ActiveDrop`, data.name);
}

/**
 * Private methods
 */

function _buildDrops(drops, defaultDrops, [dropName, ...dropNames]) {
  drops[dropName] = new Drop(defaultDrops[dropName]);
  drops[dropName].key = dropName;

  return dropNames.length
    ? _buildDrops(drops, defaultDrops, dropNames)
    : drops;
}

function _buildDefaultDrops() {
  return {
    antiBots: {
      level: 'hypochlorousAcid',
      name: 'Anti-bots'
    },
    antigenX: {
      level: 'interferon',
      name: 'Antigen-X'
    },
    carbonadium: {
      level: 'lymphocytes',
      name: 'Carbonadium'
    },
    citricol: {
      level: 'collagen',
      name: 'Citricol'
    },
    feAsone: {
      level: 'iron',
      name: 'Fe-asone'
    },
    zeoBots: {
      level: 'cellCohesion',
      name: 'Zeo-bots'
    }
  };
}
