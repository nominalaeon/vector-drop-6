
(function () {
  
  'use strict';
  
  init();
  
  /**
   * Init
   */
  
  function init() {
    bindEvents();

    app.frame.resize();
  }
  
  /**
   * Event binding and methods
   */
  
  function bindEvents() {
    app.root.addEventListener('app.frame.ready', onReadyAppFrame);
  }
  
  function onReadyAppFrame() {
    toggleDims();
    
    app.stage.collectPaths().then(() => {
      app.stage.resize();
      app.stage.createGrid();
      app.stage.createSlices();
    });
  }
  
  /**
   * General methods
   */
  
  function toggleDims() {
    var dims = document.createElement('div');
    
    dims.className = 'dimensions';
    dims.innerHTML = `${app.frame.width} x ${app.frame.height}`;
    
    app.root.appendChild(dims);
  }
  
})();
