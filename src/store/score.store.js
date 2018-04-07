
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
      context.commit('mutateHiScore', score);
    }
  }
}

function buildMutations() {
  return {
    mutateHiScore: mutateHiScore
  };
}

function buildState() {
  return {
    hiScore: 1000,
    points: {
      'dropPlayed': 50,
      'dropTrayed': 10,
      'levelCured': 500
    }
  };
}

function mutateHiScore(state, score) {
  state.hiScore = _updateHiScore(state.hiScore, score);
}

/**
 * Private methods
 */

function _updateHiScore(hiScore, score) {
  return score > hiScore ? score : hiScore;
}
