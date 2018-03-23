
export default class Drop {
  constructor(props) {
    var level = _initProps({ _vm: {} }, props, Object.keys(props));
    Object.assign(this, level);
  }

  get isActive() {
    return this._vm.critical || false;
  }
  set isActive(isActive) {
    this._vm.isActive = !!isActive;
  }

  get readyTray() {
    return this._vm.readyTray || false;
  }
  set readyTray(readyTray) {
    this._vm.readyTray = !!readyTray;
  }
};

/**
 * Private methods
 */

function _initProps(drop, props, [propName, ...propNames]) {
  if (!propName) return drop;

  drop[propName] = props[propName];

  return propNames.length
    ? _initProps(drop, props, propNames)
    : drop;
}
