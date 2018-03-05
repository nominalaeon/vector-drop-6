
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
};

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
