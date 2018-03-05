
export default class Ailment {
  constructor(props) {
    var ailment = _initProps({ _vm: {} }, props, Object.keys(props));
    Object.assign(this, ailment);
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
