
import _camelCase from 'lodash/camelCase';

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
    updateActiveDrop: updateActiveDrop
  }
}

function buildMutations() {
  return {
    mutateActiveDrop: mutateActiveDrop
  };
}

function buildState() {
  var defaultDrops = _buildDefaultDrops();

  return {
    active: '',
    all: _buildDrops({}, defaultDrops, Object.keys(defaultDrops))
  };
}

/**
 * General methods
 */

function mutateActiveDrop(state, activeDrop) {
  state.active = activeDrop;
}

function updateActiveDrop(context, activeDrop) {
  context.commit('mutateActiveDrop', activeDrop);
}

/**
 * Private methods
 */

function _buildDrops(drops, defaultDrops, [dropName, ...dropNames]) {
  drops[dropName] = new Drop(defaultDrops[dropName]);

  return dropNames.length
    ? _buildDrops(drops, defaultDrops, dropNames)
    : drops;
}

function _buildDefaultDrops() {
  return {
    antiBots: {
      name: 'Anti-bots'
    },
    antigenX: {
      name: 'Antigen-X'
    },
    carbonadium: {
      name: 'Carbonadium'
    },
    citricol: {
      name: 'Citricol'
    },
    histAWay: {
      name: 'Hist-A-Way'
    },
    zeoBots: {
      name: 'Zeo-bots'
    }
  };
}
