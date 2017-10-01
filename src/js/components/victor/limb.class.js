
'use strict';

class Limb {
  constructor() {
    this.init.apply(this, arguments);
  }
  
  get activeState() {
    return this._vm.activeState || 'default';
  }
  set activeState(activeState) {
    this._vm.activeState = activeState;
  }

  get d() {
    return this.data.join(' ');
  }
  
  get data() {
    return this._vm.data || [];
  }
  set data(data) {
    this._vm.data = Array.isArray(data) ? data : [];
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

    this.state = {};

    this.assignStates();

    console.info('Limb ready', this.id, this);
  }
  
  /**
   * Event binding and methods
   */
  
  bindEvents() {
    
  }

  /**
   * General methods
   */

  activate() {
    this.bindEvents();
  }

  assignStates() {
    for (let stateName in this.base) {
      this.state[stateName] = this.generateState(this.base[stateName]);
    }
  }

  draw() {
    this.data = this.state[this.activeState];
  }

  generateState(coors) {
    var point = '';
    var stateData = [];
    
    coors.forEach(_generateCoor.bind(this));
    
    return stateData;

    function _generateCoor(coor, index) {
      var _coor = coor.split(',');
      var coor0 = _coor[0].replace(/^([lm]).+/, '$1');
      var coor1 = parseFloat(_coor[0].replace(/^[lm](.+)/, '$1'));
      var coor2 = parseFloat(_coor[1]);
      
      point = `${coor0}${coor1 * this.width},${coor2 * this.height}`;
      stateData.push(point);

      if (index === (coors.length - 1)) {
        stateData.push('z');
        return;
      }

      point = 'l';
    }
  }

  reset(stateName) {
    if (!this.state[stateName]) {
      return;
    }

    TweenMax.to(this.root, 0.2, {
      morphSVG: `#${stateName}-${this.id}`
    });
  }

}

module.exports = Limb;

/**
 * Private methods
 */


