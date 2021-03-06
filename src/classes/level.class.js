
import _isNumber from 'lodash/isNumber';
import _kebabCase from 'lodash/kebabCase';

const SELECTOR = 'vd6-levels__level';

export default class Level {
  constructor(props) {
    var level = _initProps({ _vm: {} }, props, Object.keys(props));
    Object.assign(this, level);

    console.info('Level Class', this.name, this);
  }

  get classList() {
    return `${SELECTOR}--${_kebabCase(this.name)} ${SELECTOR}--${this.conditionLabel}`;
  }

  get condition() {
    return this._vm.condition || 1;
  }
  set condition(condition) {
    this._vm.condition = _isNumber(condition) ? condition : 1;
  }

  get conditionLabel() {
    return this.condition === this.threshold.min
      ? 'stable'
      : this.condition < this.threshold.max
        ? 'critical'
        : 'bloom';
  }

  get critical() {
    return this._vm.critical || 'High';
  }
  set critical(critical) {
    this._vm.critical = critical;
  }

  get innerSVG() {
    return this._vm.innerSVG || '';
  }
  set innerSVG(innerSVG) {
    this._vm.innerSVG = innerSVG;
  }

  get isBloomed() {
    return this.conditionLabel === 'bloom';
  }
  get isCritical() {
    return this.conditionLabel === 'critical';
  }
  get isStable() {
    return this.conditionLabel === 'stable';
  }

  get label() {
    return this.condition === this.threshold.max
      ? this.ailment.name
      : this[this.conditionLabel];
  }

  get selector() {
    return {
      root: 'vd6-levels__level',
      // Iron
      cell: 'blood-cell',
      heart: 'heart',
      membrane: 'membrane'
    };
  }

  get status() {
    return this._vm.status || 0;
  }
  set status(status) {
    this._vm.status = status;
  }

  get stable() {
    return this._vm.stable || 'Stable';
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

  /**
   * General methods
   */

  animate() {}

  cure() {
    this.reset();
  }

  decrease() {}

  increase() {}

  reset() {
    this.condition = this.threshold.min;
  }

  restartAnimation(tl) {
    tl.invalidate().restart();
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
