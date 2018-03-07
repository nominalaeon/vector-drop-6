
const SELECTOR = 'vd6-ready-trays__tray';

export default class ReadyTray {
  constructor(props) {
    var readyTray = _initProps({ _vm: {} }, props, Object.keys(props));
    Object.assign(this, readyTray);
  }

  get hasDrop() {
    return this._vm.hasDrop || false;
  }
  set hasDrop(hasDrop) {
    this._vm.hasDrop = hasDrop;
  }
};

/**
 * General methods
 */

/**
 * Private methods
 */

function _initProps(obj, props, [propName, ...propNames]) {
  if (!propName) return obj;

  obj[propName] = props[propName];

  return propNames.length
    ? _initProps(obj, props, propNames)
    : obj;
}
