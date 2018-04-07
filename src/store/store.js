
import Vue  from 'vue';
import Vuex from 'vuex';

import storeDrops       from './drops.store';
import storeGame        from './game.store';
import storeLevels      from './levels.store';
import storePatient     from './patient.store';
import storePlayer      from './player.store';
import storeReadyTrays  from './ready-trays.store';
import storeScore       from './score.store';
import storeStages      from './stages.store';

Vue.use(Vuex);

export default new Vuex.Store({
  actions:    buildActions(),
  modules:    buildModules(),
  mutations:  buildMutations(),
  state:      buildState()
});

/**
 * General methods
 */

function buildActions() {
  return {};
}

function buildModules() {
  return {
    drops:      storeDrops,
    game:       storeGame,
    levels:     storeLevels,
    patient:    storePatient,
    player:     storePlayer,
    readyTrays: storeReadyTrays,
    score:      storeScore,
    stages:     storeStages
  };
}

function buildMutations() {
  return {};
}

function buildState() {
  return {};
}
