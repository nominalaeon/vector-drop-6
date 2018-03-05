
import _isNumber from 'lodash/isNumber';

export default class Level {
  constructor(props) {
    var level = _initProps({ _vm: {} }, props, Object.keys(props));
    Object.assign(this, level);
  }

  get condition() {
    return this._vm.condition || 1;
  }
  set condition(condition) {
    this._vm.condition = _isNumber(condition) ? condition : 1;
  }

  get critical() {
    return this._vm.critical || 'high';
  }
  set critical(critical) {
    this._vm.critical = critical;
  }

  get status() {
    return this._vm.status || 0;
  }
  set status(status) {
    this._vm.status = status;
  }

  get stable() {
    return this._vm.stable || 'stable';
  }
  set stable(stable) {
    this._vm.stable = stable;
  }

  get threshold() {
    return this._vm.threshold || { max: 3, min: 1 };
  }
  set threshold(threshold) {
    this._vm.threshold = {
      max: threshold.max || 3,
      min: threshold.min || 1
    };
  }

  decrease() {
    if (this.condition === this.threshold.min) return;

    this.condition = this.condition - 1;
  }

  increase() {
    if (this.condition === this.threshold.max) return;

    this.condition = this.condition + 1;
  }
};

/**
 * General methods
 */

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
