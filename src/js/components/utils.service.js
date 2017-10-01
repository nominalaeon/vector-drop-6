
'use strict';

class Utils {
  constructor() {
    this.init.apply(this, arguments);
  }

  /**
   * Init
   */

  init(props) {
    this._vm = {};

    for (var prop in props) {
      if (!props.hasOwnProperty(prop)) {
        continue;
      }
      this[prop] = props[prop];
    }

    console.info('Utils ready', this);
  }

  /**
   * General methods
   */

  trigger(el, label, data = {}) {
    var event = {};

    if (!el || !label) {
      return;
    }

    if (window.CustomEvent) {
      event = new CustomEvent(label, data);
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(label, true, true, data);
    }

    el.dispatchEvent(event);
  }
}

module.exports = Utils;
