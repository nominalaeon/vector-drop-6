
export default class Screen {
  constructor(props) {
    var stage = _initProps({ _vm: {} }, props, Object.keys(props));
    Object.assign(this, stage);
  }

  get chars() {
    return this.text ? this.text.split('') : [];
  }

  get displayText() {
    return this._vm.displayText;
  }
  set displayText(displayText) {
    this._vm.displayText = typeof displayText === 'string'
      ? displayText
      : '';
  }

  playText(tempo) {
    var x = 0;

    this.displayText = '';

    let interval = setInterval(() => {
      if (x === this.chars.length) {
        clearInterval(interval);
        return;
      }

      let prefix = this.displayText;

      this.displayText = prefix + this.chars[x];

      x = x + 1;
    }, (tempo / 12));
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
