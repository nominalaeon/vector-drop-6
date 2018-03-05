
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
    updatePlayerId:     updatePlayerId,
    updatePlayerPerks:  updatePlayerPerks,
    updatePlayerScore:  updatePlayerScore
  }
}

function buildMutations() {
  return {
    mutatePlayerId:     mutatePlayerId,
    mutatePlayerPerks:  mutatePlayerPerks,
    mutatePlayerScore:  mutatePlayerScore
  };
}

function buildState() {
  return {
    id: '----',
    perks: [],
    readyTrays: [],
    score: 0
  };
}

/**
 * General methods
 */

function mutatePlayerId(state, id) {
  state.id = id;
}

function mutatePlayerPerks(state, { method, perk }) {
  if (!['pull', 'push'].includes(method)) {
    method = 'push';
  }

  state.perks[method](perk);
}

function mutatePlayerScore(state, increment) {
  state.score = _incrementScore(state.score, increment);
  state.dispatch('updateHiScore', state.score);
}

function updatePlayerId(context, id) {
  context.commit('mutatePlayerId', id);
}

function updatePlayerPerks(context, id) {
  context.commit('mutatePlayerPerks', id);
}

function updatePlayerScore(context, id) {
  context.commit('mutatePlayerScore', id);
}

/**
 * Private methods
 */

function _incrementScore(score, increment) {
  score += increment;

  return score > 0 ? score : 0;
}
