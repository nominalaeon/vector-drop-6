
export default class Stage {
  constructor(props) {
    var stage = _initProps({ _vm: {} }, props, Object.keys(props));

    Object.assign(this, stage);
  }

  get className() {
    return this._vm.className || '';
  }
  set className(className) {
    this._vm.className = className;
  }

  get name() {
    return this._vm.name || '';
  }
  set name(name) {
    this._vm.name = name;
  }

  get title() {
    return `Stage ${this.name}`;
  }

  get screens() {
    return this._vm.screens || [];
  }
  set screens(screens) {
    this._vm.screens = Array.isArray(screens) ? screens : [];
  }

  init({ dispatch, tempo }) {
    var promise = this.playCinematics(tempo, dispatch);

    return promise;
  }

  playCinematics(tempo, dispatch) {
    var promise = new Promise((resolve) => {
      return this.screens.length
        ? playCinematics(resolve, tempo, this.screens)
        : resolve();
    });

    return promise.then(() => {
      dispatch('updateActiveGame', true);
    });
  }
};

/**
 * General methods
 */

function playCinematics(resolve, tempo, [screen, ...screens]) {
  if (!screen) {
    return resolve();
  }

  const DUR = tempo / 6;

  let to = DUR * screen.chars.length;

  screen.isActive = true;

  screen.playText(tempo);

  return setTimeout(() => {
    screen.isActive = false;

    return screens.length
      ? playCinematics(resolve, tempo, screens)
      : resolve();
  }, to);
}

/**
 * Private methods
 */

function _initProps(stage, props, [propName, ...propNames]) {
  if (!propName) return stage;

  stage[propName] = props[propName];

  return propNames.length
    ? _initProps(stage, props, propNames)
    : stage;
}
