
'use strict';

class Path {
  constructor() {
    this.init.apply(this, arguments);
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

  get idx() {
    return  parseInt(this.id.split('-')[1]);
  }

  get rotation() {
    return this.draggable ? this.draggable.rotation : 0;
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
  }
  
  /**
   * Event binding and methods
   */
  
  bindEvents() {
    Draggable.create(this.root, {
      onDrag: this.onDragRotate.bind(this),
      liveSnap: true,
      snap: this.onSnapRotate.bind(this),
      throwProps: true,
      type: "rotation"
    });
    this.draggable = Draggable.get(`#${this.id}`);
  }

  onDragRotate() {
    
  }

  onSnapRotate(val) {
    return Math.round(val / 1) * 1;
  }

  /**
   * General methods
   */
  
  activate() {
    this.transOrg = calculateTransformOrigin(this.root, this.center);

    TweenMax.set(this.root, {
      transformOrigin: `${this.transOrg.x} ${this.transOrg.y}`
    });

    this.bindEvents();
  }

  drawLine() {
    if (!this.hasLine()) {
      return;
    }
    
    let [startX, startY] = this.line.start;
    let [endX, endY] = this.line.end;
    
    this.data = [
      `M${startX},${startY}`,
      `L${endX},${endY}`
    ];
  }
  
  drawSlice() {
    var largeArcFlag = 0;

    this.start.innerCoor = calculateRadialCoordinates(this.start, this.center, this.rad1);
    this.end.pct += this.start.pct;
    largeArcFlag = (this.end.pct - this.start.pct) > 0.5 ? 1 : 0;
    this.end.innerCoor = calculateRadialCoordinates(this.end, this.center, this.rad1);
    this.end.outerCoor = calculateRadialCoordinates(this.end, this.center, this.rad2);
    this.start.outerCoor = calculateRadialCoordinates(this.start, this.center, this.rad2);

    this.height = this.rad2 * 2;
    this.width = this.rad2 * 2;
    this.x = calculateRadialCoordinates({pct: 0.5}, this.center, this.rad2);
    this.y = calculateRadialCoordinates({pct: 0.75}, this.center, this.rad2);

    this.data = [
      `M${this.start.innerCoor.x},${this.start.innerCoor.y}`,
      `A${this.rad1},${this.rad1} 0 ${largeArcFlag} 1 ${this.end.innerCoor.x},${this.end.innerCoor.y}`,
      `L${this.end.outerCoor.x},${this.end.outerCoor.y}`,
      `A${this.rad2},${this.rad2} 0 ${largeArcFlag} 0 ${this.start.outerCoor.x},${this.start.outerCoor.y}`,
      `z`
    ];
  }
  
  hasLine() {
    if (!this.line) {
      return false;
    }
    
    return Array.isArray(this.line.start) && Array.isArray(this.line.end);
  }
  
  resize() {

  }

  rotate(deg = 0) {
    TweenLite.set(this.root, {
      rotation: this.rotation + deg
    });
    this.draggable.update();
  }
}

module.exports = Path;

/**
 * Private methods
 */

function calculateRadialCoordinates(point, center, radius) {
  var pi2pct = 2 * Math.PI * point.pct;
  return {
    x: (center.x + radius * Math.cos(pi2pct)).toFixed(2),
    y: (center.y + radius * Math.sin(pi2pct)).toFixed(2)
  };
}

function calculateTransformOrigin(el, ctr) {
  var bbox = el.getBBox();
  return {
    x: ctr.x - bbox.x,
    y: ctr.y - bbox.y
  };
}
