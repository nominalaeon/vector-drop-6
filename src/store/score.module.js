
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
    updateHiScore: function updateHiScore(context, score) {
      // context.rootState.parent.hiScore ?
      context.commit('updateHiScore', score);
    }
  }
}

function buildMutations() {
  return {
    updateHiScore: updateHiScore
  };
}

function buildState() {
  return {
    hiScore: 1000
  };
}

function updateHiScore(state, score) {
  state.hiScore = updateHiScore(state.hiScore, state.player.score);
}

/**
 * Private methods
 */

function _updateHiScore(hiScore, score) {
  return score > hiScore ? score : hiScore;
}
