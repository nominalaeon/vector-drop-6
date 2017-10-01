
'use strict';

import Api    from './components/api.service.js';
import Frame  from './components/frame.service.js';
import Stage  from './components/stage/stage.service.js';
import Utils  from './components/utils.service.js';
import Victor from './components/victor/victor.service.js';

class VectorDrop6 {
  constructor() {
    this.root = document.querySelector(`.${this.className}`);

    this.init();
  }

  get className() {
    return 'vd6';
  }

  /**
   * Init
   */

  init() {
    this.initializeComponents();

    this.utils.trigger(this.root, 'app.ready');

    this.bindEvents();

    this.frame.resize();
  }

  initializeComponents() {
    this.api = new Api({});
    this.utils = new Utils({});

    this.frame = new Frame({
      api: this.api,
      appRoot: this.root,
      root: this.root.querySelector(`.${this.className}-frame`),
      utils: this.utils
    });
    this.stage = new Stage({
      api: this.api,
      appRoot: this.root,
      frame: this.frame,
      root: this.root.querySelector(`.${this.className}-stage`),
      utils: this.utils
    });
    this.victor = new Victor({
      api: this.api,
      appRoot: this.root,
      frame: this.frame,
      root: this.root.querySelector(`.${this.className}-victor`),
      utils: this.utils
    });
  }

  /**
   * Event binding and methods
   */

  bindEvents() {
    this.root.addEventListener('app.frame.ready', onReadyAppFrame.bind(this));
    this.root.addEventListener('app.stage.ready', onReadyAppStage.bind(this));
  }

  /**
   * General methods
   */

  toggleDims() {
    var dims = document.createElement('div');

    dims.className = 'dimensions';
    dims.innerHTML = `${this.frame.width} x ${this.frame.height}`;

    this.root.appendChild(dims);
  }

}

window.VectorDrop6 = new VectorDrop6();

/**
 * Private methods
 */

function onReadyAppFrame() {
  this.toggleDims();
  
  this.stage.collectPaths()
    .then(_drawStage.bind(this))
    .then(() => {
      this.utils.trigger(this.root, 'app.stage.ready');
    });

  function _drawStage() {
    this.stage.resize();
    this.stage.createGrid();
    this.stage.createRings();
  }
}

function onReadyAppStage() {
  this.victor.collectPaths()
    .then(_drawVictor.bind(this));

  function _drawVictor() {
    this.victor.resize();
    this.victor.createSelf();
  }
}
