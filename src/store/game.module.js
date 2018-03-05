
import Timer from '@classes/timer.class';

const MINUTE  = 60000;

export default {
  actions:    buildActions(),
  getters:    buildGetters(),
  mutations:  buildMutations(),
  state:      buildState()
};

/**
 * Build methods
 */

function buildActions() {
  return {
    incrementGameTimer: incrementGameTimer,
    resetGameTimer: resetGameTimer,
    startGameTimer: startGameTimer,
    updateActiveGame: updateActiveGame,
    updateGameElement: updateGameElement,
    updateGameThreshold: updateGameThreshold
  }
}

function buildGetters() {
  return {
    loops: function loops(state) {
      return state.timer.loops;
    },
    tempo: function tempo(state) {
      return MINUTE / state.bpm;
    }
  };
}

function buildMutations() {
  return {
    mutateActiveGame: mutateActiveGame,
    mutateGameElement: mutateGameElement,
    mutateGameThreshold: mutateGameThreshold,
    mutateGameTimer: mutateGameTimer
  };
}

function buildState() {
  return {
    $activeDrop: {},
    $readyTrays: [],
    bpm: 120,
    isActive: false,
    pain: 0,
    progress: 0,
    threshold: {
      pain: 0,
      progress: 0,
      readyTrays: 0,
      timer: 0
    },
    timer: {
      loops: 0,
      start: 0,
      stop: false,
      time: 0
    },
    timerStop: false
  };
}

/**
 * General methods
 */

function incrementGameTimer(context, timestamp) {
  var timer = context.state.timer;

  var newTime = 0;

  if (timer.start === 0) {
    context.commit('mutateGameTimer', { type: 'start', val: timestamp });
  }

  newTime = timestamp - context.state.timer.start;

  if (newTime > context.state.threshold.timer) {
    context.commit('mutateGameTimer', { type: 'loops', val: timer.loops + 1 });
    context.commit('mutateGameTimer', { type: 'start', val: 0 });
    context.commit('mutateGameTimer', { type: 'time', val: 0 });
  } else if (timestamp % context.getters.tempo < 18) {
    context.commit('mutateGameTimer', { type: 'time', val: newTime });
  }

  return !timer.stop
    ? window.requestAnimationFrame(context.dispatch.bind(this, 'incrementGameTimer'))
    : timer.time;
}

function mutateActiveGame(state, isActive) {
  state.isActive = isActive;
}

function mutateGameElement(state, data) {
  state[`$${data.type}`] = data.val;
}

function mutateGameThreshold(state, data) {
  state.threshold[data.type] = data.threshold;
}

function mutateGameTimer(state, data) {
  state.timer[data.type] = data.val;
}

function resetGameTimer(context) {
  context.commit('mutateGameTimer', { type: 'loops', val: 0 });
  context.commit('mutateGameTimer', { type: 'start', val: 0 });
  context.commit('mutateGameTimer', { type: 'stop', val: false });
  context.commit('mutateGameTimer', { type: 'time', val: 0 });
}

function startGameTimer(context) {
  console.info('Timer start', context);

  return window.requestAnimationFrame(context.dispatch.bind(this, 'incrementGameTimer'));
}

function updateActiveGame(context, isActive) {
  context.commit('mutateActiveGame', !!isActive);
}

function updateGameElement(context, data) {
  context.commit('mutateGameElement', data);
}

function updateGameThreshold(context, data) {
  context.commit('mutateGameThreshold', data);
}
