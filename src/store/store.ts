
import Vue              from 'vue';
import Vuex             from 'vuex';
import { ActionTree }   from 'vuex';
import { MutationTree } from 'vuex';

import * as T           from '../types/common';

Vue.use(Vuex);

interface State {
  hiScore: number,
  player: T.Player
}

let mutations: MutationTree<State> = buildMutations();

let actions: ActionTree<State, any> = {
}

let state: State = {
  hiScore: 1000,
  player: buildPlayer()
};

export default new Vuex.Store<State>({
  mutations: mutations,
  actions: actions,
  state: state
});

/**
 * General methods
 */

function buildMutations() {
  return {
    updatePlayerId(state: State, id: string) {
      state.player.id = id;
    },
    updateHiScore(state: State, score: number) {
      state.hiScore = updateHiScore(state.hiScore, state.player.score);
    },
    updatePlayerScore(state: State, increment: number) {
      state.player.score = updatePlayerScore(state.player.score, increment);
      state.hiScore = updateHiScore(state.hiScore, state.player.score);
    }
  };
}

function buildPlayer() {
  return {
    id: '----',
    score: 0
  };
}

function updateHiScore(hiScore: number, score: number) {
  return score > hiScore ? score : hiScore;
}

function updatePlayerScore(score: number, increment: number) {
  var newScore: number = score + increment;

  return newScore > 0 ? newScore : 0;
}
