
import Vue  from 'vue';
import Vuex from 'vuex';

import mDrops       from './drops.module';
import mGame        from './game.module';
import mLevels      from './levels.module';
import mPlayer      from './player.module';
import mReadyTrays  from './ready-trays.module';
import mScore       from './score.module';
import mStages      from './stages.module';

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
    drops:      mDrops,
    game:       mGame,
    levels:     mLevels,
    player:     mPlayer,
    readyTrays: mReadyTrays,
    score:      mScore,
    stages:     mStages
  };
}

function buildMutations() {
  return {};
}

function buildState() {
  return {};
}
