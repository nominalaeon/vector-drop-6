
import Level from '@classes/level.class';

import { CENTER } from '@services/dimensions.constants';
import COLOR from '@services/colors.constants';
import htmlUtils from '@services/html.utils';
import svgUtils from '@services/svg.utils';

import _isNumber from 'lodash/isNumber';

export default class CellCohesion extends Level {
  constructor(props) {
    super(props);

    this.init();
  }

  /**
   * Init methods
   */

  init() {
    this.innerSVG = _buildSVG();
  }

  /**
   * General methods
   */

  animate() {
    this.selectElements();
    this.initTimelines();
    this.buildTweens();
  }

  buildPathsCriticalOuter() {
    var membranes = drawPathsCriticalOuter([], this.selector.membrane, [3, 2, 5]);

    return membranes;
  }

  buildTweens() {
    var restartCallback = this.restartAnimation;

    this.nextStart = 'critical';
    this.nextEnd = 'end';

    buildTweensStableInner('stable', this.tl.innerBounce, this.stableInnerMembrane);
    buildTweensStableOuter('stable', restartCallback, this.tl.outerMorph, this.tl.outerRotate, this.stableOuterMembranes);
    buildTweensCriticalInner('critical', this.tl.innerBounce, this.stableInnerMembrane);
    buildTweensCriticalOuter('critical', restartCallback, this.tl.outerMorph, this.tl.outerRotate, this.criticalOuterMembranes, this.stableOuterMembranes[0]);

    this.tl.innerBounce.add('end');
    this.tl.outerMorph.add('end');
    this.tl.outerRotate.add('end');

    this.$svg.style.visibility = 'visible';

    this.resetAnimations('stable', 'critical');
  }

  decrease() {
    if (this.condition === this.threshold.min) return;

    if (this.nextStart === 'critical') {
      this.nextStart = 'stable';
      this.nextEnd = 'critical';
    }

    this.resetAnimations(this.nextStart, this.nextEnd);

    this.condition = this.condition - 1;
  }

  increase() {
    if (this.condition === this.threshold.max) return;

    if (this.nextStart === 'stable') {
      this.nextStart = 'critical';
      this.nextEnd = 'end';
    }

    this.resetAnimations(this.nextStart, this.nextEnd);

    this.condition = this.condition + 1;
  }

  initTimelines() {
    this.tl = {
      innerBounce: new TimelineMax({ paused: true }),
      outerMorph: new TimelineMax({ paused: true, yoyo: true }),
      outerRotate: new TimelineMax({ paused: true }),
      running: false
    };
    this.tween = {
      innerBounce: {},
      outerMorph: {},
      outerRotate: {}
    };
  }

  pauseAnimations() {
    this.tween.innerBounce.invalidate().kill();
    this.tween.outerMorph.invalidate().kill();
    this.tween.outerRotate.invalidate().kill();
  }

  reset() {
    if (this.nextStart === 'critical') {
      this.nextStart = 'stable';
      this.nextEnd = 'critical';
    }

    this.resetAnimations(this.nextStart, this.nextEnd);

    this.condition = this.threshold.min;
  }

  resetAnimations(start, end = 'end') {
    if (this.tl.running) this.pauseAnimations();

    this.tween.innerBounce = this.tl.innerBounce.tweenFromTo(start, end, { repeat: -1 });
    this.tween.outerMorph = this.tl.outerMorph.tweenFromTo(start, end, { repeat: -1 });
    this.tween.outerRotate = this.tl.outerRotate.tweenFromTo(start, end);

    this.tl.running = true;
  }

  selectElements() {
    var stableOuterMembranes = this.$root.querySelectorAll(`.${this.selector.membrane}--outer.${this.selector.membrane}--stable`);

    this.criticalOuterMembranes = this.buildPathsCriticalOuter();
    this.stableInnerMembrane = this.$root.querySelector(`.${this.selector.membrane}--inner.${this.selector.membrane}--stable`);
    this.stableOuterMembranes = htmlUtils.nodelistToArray([], stableOuterMembranes, 0);
  }
};

/**
 * General methods
 */

function buildTweensCriticalInner(label, innerBounce, innerMembrane) {
  var bounces = [
    { skewX: -2, x: 6, y: 7 },
    { skewX: 2, x: 4, y: 6 },
    { skewX: 0, x: 4, y: 4 },
    { skewX: 2, x: 4, y: 4 }
  ];
  var data = {
    durMin: 0.25,
    durMax: 0.75,
    isEratic: true,
    position: 0,
    target: innerMembrane,
    tl: innerBounce
  };
  var startData = {
    fill: COLOR.electricPurpleDarker,
    stroke: COLOR.electricPurpleDark,
    skewX: 2, x: 4, y: 4
  };

  innerBounce.add(label);
  innerBounce.set(innerMembrane, startData);
  svgUtils.buildBounceFrames(data, bounces, 0);
}

function buildTweensCriticalOuter(label, callback, outerMorph, outerRotate, membranes, target) {
  var morphData = {
    duration: 0.5,
    position: 0,
    target: target,
    tl: outerMorph
  };
  var rotationData = {
    callback: callback,
    center: {
      x: CENTER.x,
      y: CENTER.y
    },
    duration: 0.25,
    position: 0.5,
    rotation: -15,
    target: target,
    tl: outerRotate
  };
  var startData = {
    fill: COLOR.electricPurpleDark,
    stroke: COLOR.electricPurpleDark
  };

  outerMorph.add(label);
  outerMorph.set(target, startData);
  svgUtils.buildMorphFrames(morphData, membranes, 0);

  // OuterRotate
  outerRotate.add(label);
  svgUtils.buildRotationFrames(rotationData);
}

function buildTweensStableInner(label, innerBounce, innerMembrane) {
  var bounces = [
    { skewX: -6, x: 5, y: 5 },
    { skewX: 6, x: 5, y: 7.5 },
    { skewX: 0, x: 0, y: 0 },
    { skewX: 6, x: 7.5, y: 0 }
  ];
  var data = {
    durMin: 1.5,
    durMax: 1.5,
    isEratic: true,
    position: 0,
    target: innerMembrane,
    tl: innerBounce
  };
  var startData = {
    fill: COLOR.roseDarker,
    stroke: COLOR.roseDark,
    skewX: 6, x: 7.5, y: 0
  };

  innerBounce.add(label);
  innerBounce.set(innerMembrane, startData);
  svgUtils.buildBounceFrames(data, bounces, 0);
}

function buildTweensStableOuter(label, callback, outerMorph, outerRotate, membranes) {
  var morphData = {
    duration: 1,
    fill: COLOR.roseDark,
    position: 0.5,
    stroke: COLOR.roseDarker,
    target: membranes[0],
    tl: outerMorph
  };
  var rotationData = {
    callback: callback,
    center: {
      x: CENTER.x,
      y: CENTER.y
    },
    duration: 0.75,
    position: 0.75,
    rotation: 30,
    target: membranes[0],
    tl: outerRotate
  };
  var startData = {
    fill: COLOR.roseDark,
    stroke: COLOR.roseDarker
  };

  membranes.push(membranes[0]);

  outerMorph.add(label);
  outerMorph.set(membranes[0], startData);

  outerMorph.add(label);
  svgUtils.buildMorphFrames(morphData, membranes, 0);

  // OuterRotate
  outerRotate.add(label);
  svgUtils.buildRotationFrames(rotationData);
}

function drawPathsCriticalOuter(paths, selector, rads) {
  const SLICES = 9;

  var pathData = ['M90,50'];
  var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  var bezierData = {
    count: SLICES,
    rad: 40,
    radDelta: rads.shift(),
    startDelta: 100 / SLICES,
    startPct: 0
  };

  var beziers = svgUtils.buildQuadraticBeziers(pathData, bezierData);

  pathEl.setAttribute('class', `${selector} ${selector}--outer ${selector}--critical`);
  pathEl.setAttribute('d', beziers.join(' '));

  paths.push(pathEl);

  return rads.length
    ? drawPathsCriticalOuter(paths, selector, rads)
    : paths;
}

/**
 * Private methods
 */

function _buildSVG() {
  return `
    <path class="membrane membrane--outer membrane--stable" d="M55,11
      c10.22,0,18.87,3.93,25,11.35,5.8,7,9,16.83,9,27.65
      s-3.19,20.64-9,27.65
      C73.87,85.07,65.22,89,55,89
      c-10.76,0-23-4.31-32.69-11.52
      C11.79,69.66,6,59.9,6,50
      s5.79-19.66,16.31-27.48
      C32,15.31,44.24,11,55,11 z" />
    <path class="membrane membrane--outer membrane--stable" d="M50,6
      c9.9,0,19.66,5.79,27.48,16.31
      C84.69,32,89,44.24,89,55
      c0,10.22-3.93,18.87-11.35,25-7,5.8-16.83,9-27.65,9
      s-20.64-3.19-27.65-9
      C14.93,73.87,11,65.22,11,55
      c0-10.76,4.31-23,11.52-32.69
      C30.34,11.79,40.1,6,50,6 z" />
    <path class="membrane membrane--outer membrane--stable" d="M45,11
      c10.76,0,23,4.31,32.69,11.52
      C88.21,30.34,94,40.1,94,50
      S88.21,69.66,77.69,77.48
      C68,84.69,55.76,89,45,89
      c-10.22,0-18.87-3.93-25-11.35-5.8-7-9-16.83-9-27.65
      s3.19-20.64,9-27.65
      C26.13,14.93,34.78,11,45,11 z" />

    <path class="membrane membrane--inner membrane--stable" d="m45,15
      c30,0 30,30 30,30
      c0,30 -30,30 -30,30
      c-30,0 -30,-30 -30,-30
      c0,-30 30,-30 30,-30 z" />
  `;
}
