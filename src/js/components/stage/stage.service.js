
'use strict';

import Path from './path.class.js';
import Ring from './ring.class.js'

class Stage {
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
    
    this.vue = new Vue({
      el: this.root,
      data: {
        height: 0,
        gridLines: [],
        rings: [],
        slices: [],
        width: 0
      },
      updated: this.onUpdate.bind(this)
    });

    console.info('Stage ready', this);
  }

  /**
   * General methods
   */

  assignPaths(results) {
    this.base = results.data;
    return results;
  }

  collectPaths() {
    return this.api.getStage().then(this.assignPaths.bind(this));
  }
  
  createGrid() {
    this.gridLines = [];

    this.base.gridLines.forEach(createGridLine.bind(this));

    this.vue.gridLines = this.gridLines;
  }

  createRings() {
    this.rings = [];

    this.base.rings.forEach(createRing.bind(this));

    this.createSlices();

    this.vue.rings = this.rings;
    this.vue.slices = this.slices;
  }

  createSlices() {
    this.slices = [];
    
    this.rings.forEach((ring) => {
      ring.slices.forEach((slice) => {
        this.slices.push(slice);
      });
    });
  }
  
  onUpdate() {
    this.vue.slices.forEach(activateSlice.bind(this));
  }

  resize() {
    this.height = this.frame.height;
    this.width = this.frame.width;
    
    this.vue.height = this.height;
    this.vue.width = this.width;

    this.center = {
      x: this.frame.width / 2,
      y: this.frame.height / 2
    };
  }
}

module.exports = Stage;

/**
 * Private methods
 */

function activateSlice(slice) {
  slice.root = this.vue.$el.getElementById(slice.id);

  slice.activate();
}

function createGridLine(position) {
  var pathHor = new Path({
    className: 'vd6-stage__grid-line stage__grid-line--hor',
    line: {
      end: [this.frame.width, this.frame.height * position],
      start: [0, this.frame.height * position]
    },
    root: document.createElementNS('http://www.w3.org/2000/svg', 'path')
  });
  var pathVer = new Path({
    className: 'vd6-stage__grid-line stage__grid-line--ver',
    line: {
      end: [this.frame.width * position, this.frame.height],
      start: [this.frame.width * position, 0]
    },
    root: document.createElementNS('http://www.w3.org/2000/svg', 'path')
  });

  pathHor.drawLine();
  pathVer.drawLine();

  [].push.apply(this.gridLines, [pathHor, pathVer]);
}

function createRing(ring, index) {
  var ring = new Ring({
    center: this.center,
    className: `vd6-stage__ring-group vd6-stage__ring-group--${index}`,
    id: index,
    rad1: (this.width * ring.rad1).toFixed(2),
    rad2: (this.width * ring.rad2).toFixed(2)
  });
  
  this.rings.push(ring);
}
