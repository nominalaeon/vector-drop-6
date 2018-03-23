
import Vue from 'vue';

import ReadyTray from '@classes/ready-tray.class';

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
    updateReadyTrays: updateReadyTrays
  }
}

function buildMutations() {
  return {
    mutateReadyTrays: mutateReadyTrays
  };
}

function buildState() {
  return {
    all: {}
  };
}

/**
 * General methods
 */

function mutateReadyTrays(state, readyTrays) {
  if (!Array.isArray(readyTrays)) return;

  _addReadyTray(state, 0, readyTrays);
}

function updateReadyTrays(context, readyTrays) {
  context.commit('mutateReadyTrays', readyTrays);
}

/**
 * Private methods
 */

function _addReadyTray(state, index, readyTrays) {
  var readyTray = new ReadyTray(readyTrays[index]);
  readyTray.id = 'readyTray' + index;

  Vue.set(state.all, readyTray.id, readyTray);

  index = index + 1;

  return readyTrays[index]
    ? _addReadyTray(state, index, readyTrays)
    : false;
}
