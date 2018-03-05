
import _camelCase   from 'lodash/camelCase';
import _kebabCase   from 'lodash/kebabCase';

import Screen from '@classes/screen.class';
import Stage  from '@classes/stage.class';

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
    updateActiveStage: function updateActiveStage(context, stageName) {
      context.commit('updateActiveStage', stageName);
    }
  }
}

function buildMutations() {
  return {
    updateActiveStage: updateActiveStage
  };
}

function buildState() {
  var stageNames = [
    'Omega Phase'
  ];

  return {
    active: '',
    all: _buildStages(_buildScreens(), {}, stageNames)
  };
}

function updateActiveStage(state, stageName) {
  state.active = state.all[stageName]
    ? stageName
    : '';
}

/**
 * Private methods
 */

// put into json file
function _buildScreens() {
  return {
    omegaPhase: []
    // omegaPhase: [{
    //   bgColor: '#520031',
    //   displayText: '',
    //   img: 'the-octagon.png',
    //   isActive: false,
    //   text: `In a secret laboratory underneath Virginia...`
    // }, {
    //   bgColor: '#000',
    //   displayText: '',
    //   img: 'general.png',
    //   isActive: false,
    //   text: `"Dr. Drangle-Brungis, the army has paid millions for results...`
    // }, {
    //   bgColor: '#000',
    //   displayText: '',
    //   img: 'general.png',
    //   isActive: false,
    //   text: `"...and results are what we expect!!!"`
    // }, {
    //   bgColor: '#FF1AA2',
    //   displayText: '',
    //   img: 'dr-drangle-brungis.png',
    //   isActive: false,
    //   text: `"Your visit is most fortuitious, General.`
    // }, {
    //   bgColor: '#B2096E',
    //   displayText: '',
    //   img: 'dr-drangle-brungis.png',
    //   isActive: false,
    //   text: `"we were just beginning the project's OMEGA phase!!!"`
    // }]
  };
}

function _buildStages(screens, stages, [stageName, ...stageNames]) {
  var className = _kebabCase(stageName);
  var keyName = _camelCase(stageName);
  stages[keyName] = new Stage({
    className: className,
    name: stageName,
    screens: screens[keyName].map((screen) => new Screen(screen))
  });

  delete screens[keyName];

  return stageNames.length
    ? _buildStages(screens, stages, stageNames)
    : stages;
}
