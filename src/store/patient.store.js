
import Vue from 'vue';

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
    updatePatient: updatePatient
  }
}

function buildMutations() {
  return {
    mutatePatient: mutatePatient
  };
}

function buildState() {
  return {
    body: {}
  };
}

/**
 * General methods
 */

function mutatePatient(state, data) {
  state[data.prop] = data.val;
}

function updatePatient(context, data) {
  context.commit('mutatePatient', data);
}

/**
 * Private methods
 */
