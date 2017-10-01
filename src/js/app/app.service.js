
(function () {
  
  'use strict';
  
  window.app = {
    root: document.querySelector('.wrapper')
  };
  
  init();
  
  function init() {
    _.extend(app, {
      apiService: new ApiService({}),
      frame: new Frame({
        root: app.root.querySelector('.frame')
      }),
      stage: new Stage({
        root: app.root.querySelector('.stage')
      }),
      utils: new Utils({})
    });
    
    app.utils.trigger(app.root, 'app.ready');
  }
  
})();
