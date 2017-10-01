
'use strict';

import Limb from './limb.class.js';

class Victor {
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
        limbs: [],
        width: 0
      },
      updated: this.onUpdate.bind(this)
    });

    console.info('Victor ready', this);
  }

  /**
   * General methods
   */
  
  assignPaths(results) {
    this.base = results.data;
    return results;
  }

  collectPaths() {
    return this.api.getVictor().then(this.assignPaths.bind(this));
  }

  createSelf() {
    this.limbs = [];

    this.arm = {
      right: createLimb.call(this, this.base.arm.right, 'arm', 'right'),
      left: createLimb.call(this, this.base.arm.left, 'arm', 'left')
    };
    this.head = createLimb.call(this, this.base.head, 'head');
    this.leg = {
      right: createLimb.call(this, this.base.leg.right, 'leg', 'right'),
      left: createLimb.call(this, this.base.leg.left, 'leg', 'left')
    };
    this.torso = createLimb.call(this, this.base.torso, 'torso');

    this.vue.limbs = [
      this.arm.right,
      this.arm.left,
      this.head,
      this.leg.right,
      this.leg.left,
      this.torso
    ];
  }

  onUpdate() {
    this.vue.limbs.forEach(activateLimb.bind(this));
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

module.exports = Victor;

/**
 * Private methods
 */

function activateLimb(limb) {
  limb.root = this.vue.$el.getElementById(limb.id);

  limb.activate();

  let states = [
    'a-1',
    'default',
    'sway',
    'default',
    'a-2',
    'default',
    'sway',
    'default'
  ];

  let state = 0;
  let newState = states[state];
  setInterval(() => {
    this.vue.limbs.forEach((limb) => {
      limb.reset(newState);
    });
    state++;
    if (state === states.length) {
      state = 0;
    }
    newState = states[state];
    console.log('STATE', states.length - 1, state, state === (states.length - 1), newState);
  }, 300);
}

function createLimb(base, element, modifier) {
  var body = 'vd6-victor';
  var className = `${body}__limb ${body}__limb--${element}`;
  var id = modifier ? `${element}-${modifier}` : element;

  if (modifier) {
    className += ` ${body}__limb--${modifier}`;
  }

  var limb = new Limb({
    base: base,
    className: className,
    height: this.height,
    id: id,
    width: this.width
  });

  limb.draw();

  return limb;
}
