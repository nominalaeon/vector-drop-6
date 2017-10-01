
"use strict";

import Utils from './utils.service.js';

class Frame {
  constructor() {
    this.init.apply(this, arguments);
  }

  get height() {
    return this._vm.height || 0;
  }
  set height(height) {
    var _height = parseInt(height);

    this._vm.height = typeof _height === 'number' ? height : 0;
  }

  get ratio() {
    return 9/16;
  }

  get width() {
    return this._vm.width || 0;
  }
  set width(width) {
    var _width = parseInt(width);

    this._vm.width = typeof _width === 'number' ? width : 0;
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

    console.info('frame ready', this);
  }

  /**
   * General methods
   */

  resize() {
    this.height = this.root.offsetHeight;
    this.width = this.height * this.ratio;

    this.root.style.height = this.height + 'px';
    this.root.style.width = this.width + 'px';

    this.utils.trigger(this.appRoot, 'app.frame.ready');
  }
}

module.exports = Frame;
