
'use strict';

import Path from './path.class.js';

class Ring {
  constructor() {
    this.init.apply(this, arguments);
  }

  get sliceCount() {
    return 10;
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

    this.createSlices();

    console.info('Ring ready', this);
  }
  
  /**
   * Event binding and methods
   */
  
  bindEvents() {
    
  }

  /**
   * General methods
   */
  
  createSlices() {
    var percent = 1 / this.sliceCount;

    this.slices = [];

    for (let x = 0; x < this.sliceCount; x++) {
      this.createSlice(x, percent);
    }

    return this.slices;
  }

  createSlice(index, pct) {
    var slice = new Path({
      center: this.center,
      className: `vd6-stage__slice vd6-stage__slice--${index}`,
      end: { pct: pct },
      id: `${this.id}-${index}`,
      rad1: this.rad1,
      rad2: this.rad2,
      start: { pct: pct * index }
    });

    slice.drawSlice();

    this.slices.push(slice);
  }

}

module.exports = Ring;

/**
 * Private methods
 */


