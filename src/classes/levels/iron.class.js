
import _isNumber from 'lodash/isNumber';

import Level from '@classes/level.class';

import COLOR from '@services/colors.constants';
import htmlUtils from '@services/html.utils';
import svgUtils from '@services/svg.utils';

export default class Iron extends Level {
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

  buildTweens() {
    this.nextStart = 'critical';
    this.nextEnd = 'end';

    buildTweensStableCells('stable', this.tl.cell, this.stableCells, this.criticalCells);
    buildTweensStableHearts('stable', this.tl.heartMorph, this.tl.heartMove, this.stableHearts, this.stableHearts[0]);
    buildTweensCriticalHearts('critical', this.tl.heartMorph, this.tl.heartMove, this.criticalHearts, this.stableHearts[0]);
    buildTweensCriticalCells('critical', this.tl.cell, this.stableCells, this.criticalCells);

    this.tl.cell.add('end');
    this.tl.heartMorph.add('end');
    this.tl.heartMove.add('end');

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
      cell: new TimelineMax({ paused: true }),
      heartMorph: new TimelineMax({ paused: true, yoyo: true }),
      heartMove: new TimelineMax({ paused: true }),
      running: false
    };
    this.tween = {
      cell: {},
      heartMorph: {},
      heartMove: {}
    };
  }

  pauseAnimations() {
    this.tween.cell.invalidate().kill();
    this.tween.heartMorph.invalidate().kill();
    this.tween.heartMove.invalidate().kill();
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

    this.tween.cell = this.tl.cell.tweenFromTo(start, end, { repeat: -1 });
    this.tween.heartMorph = this.tl.heartMorph.tweenFromTo(start, end, { repeat: -1 });
    this.tween.heartMove = this.tl.heartMove.tweenFromTo(start, end, { repeat: 0 });

    this.tl.running = true;
  }

  selectElements() {
    var criticalCells = this.$root.querySelectorAll(`.${this.selector.cell}--critical`);
    var criticalHearts = this.$root.querySelectorAll(`.${this.selector.heart}--inner.${this.selector.heart}--critical`);
    var stableCells = this.$root.querySelectorAll(`.${this.selector.cell}--stable`);
    var stableHearts = this.$root.querySelectorAll(`.${this.selector.heart}--inner.${this.selector.heart}--stable`);

    this.criticalCells = htmlUtils.nodelistToArray([], criticalCells, 0);
    this.criticalHearts = htmlUtils.nodelistToArray([], criticalHearts, 0);
    this.stableCells = htmlUtils.nodelistToArray([], stableCells, 0);
    this.stableHearts = htmlUtils.nodelistToArray([], stableHearts, 0);
  }
};

/**
 * General methods
 */

function buildTweensCriticalCells(label, cellTl, stableCells, criticalCells) {
  var startData = {
    scaleX: 0,
    scaleY: 0
  };

  cellTl.add(label);
  cellTl.set(stableCells, startData);
  cellTl.to(criticalCells, 0.5, {
    x: 2,
    y: 2
  }, '+=0.5')
  .to(stableCells.concat(criticalCells), 0.5, {
    x: -0,
    y: 0
  }, '+=0.5');
}

function buildTweensCriticalHearts(label, heartMorph, heartMove, hearts, target) {
  var morphData = {
    duration: 0.75,
    position: 0.25,
    target: target,
    tl: heartMorph
  };
  var startData = {
    fill: COLOR.electricPurpleDark,
    stroke: COLOR.electricPurple
  };

  hearts.push(hearts[0]);

  heartMorph.add(label);
  heartMorph.set(target, startData);
  svgUtils.buildMorphFrames(morphData, hearts, 0);

  // OuterRotate
  heartMove.add(label);
  heartMove.from(target, 0.5, {
    ease: Back.easeInOut,
    y: 0
  });
  heartMove.to(target, 0.5, {
    ease: Back.easeInOut,
    y: 20
  });
}

function buildTweensStableCells(label, cellTl, stableCells, criticalCells) {
  var startData = {
    scaleX: 1,
    scaleY: 1
  };

  cellTl.add(label);
  cellTl.set(stableCells, startData);
  cellTl.to(stableCells.concat(criticalCells), 0.5, {
    x: 4,
    y: 3
  }, '+=0.5')
  .to(stableCells.concat(criticalCells), 1, {
    x: -0,
    y: 0
  }, '+=1');
}

function buildTweensStableHearts(label, heartMorph, heartMove, hearts, target) {
  var morphData = {
    duration: 1,
    fill: COLOR.roseDarker,
    position: 0.5,
    stroke: COLOR.roseDark,
    target: target,
    tl: heartMorph
  };
  var startData = {
    fill: COLOR.roseDarker,
    stroke: COLOR.roseDark
  };

  hearts.push(hearts[0]);

  heartMorph.add(label);
  heartMorph.set(target, startData);
  svgUtils.buildMorphFrames(morphData, hearts, 0);

  // OuterRotate
  heartMove.add(label);
  heartMove.from(target, 0.25, {
    ease: Back.easeInOut,
    y: 20
  });
  heartMove.to(target, 0.25, {
    ease: Back.easeInOut,
    y: 0
  });
}

/**
 * Private methods
 */

function _buildSVG() {
  return `
    <clipPath id="inner-heart-mask" class="heart-mask heart-mask--inner">
      <path d="m50,81
        c-1,0 -1,0 -1,0
        c-36,-18 -36,-36 -36,-36
        c0,-18 19,-18 19,-18
        c16,0 17,9 17,9
        c1,0 1,0 1,0
        c1,0 1,0 1,0
        c1,-8 17,-9 17,-9
        c19,0 19,18 19,18
        c0,18 -36,36 -36,36
        c-1,0 -1,0 -1,0" />
    </clipPath>

    <path class="heart heart--outer" d="m50,85
      c-2,0 -2,0 -2,0
      c-38,-20 -38,-40 -38,-40
      c0,-20 20,-20 20,-20
      c19,0 19,10 19,10
      c1,0 1,0 1,0
      c1,0 1,0 1,0
      c4,-10 19,-10 19,-10
      c20,0 20,20 20,20
      c0,20 -38,40 -38,40
      c-2,0 -2,0 -2,0" />

    <g clip-path="url(#inner-heart-mask)">
      <path class="heart heart--inner heart--stable" d="m50,85
        l-40,0
        l0,-46
        q10,-5 20,0 t20,0
        q10,-5 20,0 t20,0
        l0,46
        l-40,0" />
      <path class="heart heart--inner heart--stable" d="m50,85
        l-40,0
        l0,-46
        q10,5 20,0 t20,0
        q10,5 20,0 t20,0
        l0,46
        l-40,0" />

      <path class="heart heart--inner heart--critical" d="m50,85
        l-40,0
        l0,-50
        q10,-2 20,0 t20,0
        q10,-2 20,0 t20,0
        l0,50
        l-40,0" />
      <path class="heart heart--inner heart--critical" d="m50,85
        l-40,0
        l0,-50
        q10,2 20,0 t20,0
        q10,2 20,0 t20,0
        l0,50
        l-40,0" />

      <g class="blood-cells">
        <g class="blood-cell blood-cell--stable">
          <path d="m26,45
            c5,0 5,3 5,3
            c0,2 -2,2 -2,2
            c-3,0 -3,-2 -3,-1
            c-2,-1 -2,0 -3,0
            c-2,0 -2,-2 -2,-2
            c0,-2 5,-2 5,-2" />
          <path d="m23,47
            c0,1 2,0 2,0
            c2,0 2,1 4,1" />
        </g>
        <g class="blood-cell blood-cell--stable">
          <path d="m48,43
            c5,0 5,3 5,3
            c0,2 -2,2 -2,2
            c-3,0 -3,-2 -3,-1
            c-2,-1 -2,0 -3,0
            c-2,0 -2,-2 -2,-2
            c0,-2 5,-2 5,-2" />
          <path d="m45,45
            c0,1 2,0 2,0
            c2,0 2,1 4,1" />
        </g>
        <g class="blood-cell blood-cell--stable">
          <path d="m72,47
            c5,0 5,3 5,3
            c0,2 -2,2 -2,2
            c-3,0 -3,-2 -3,-1
            c-2,-1 -2,0 -3,0
            c-2,0 -2,-2 -2,-2
            c0,-2 5,-2 5,-2" />
          <path d="m69,49
            c0,1 2,0 2,0
            c2,0 2,1 4,1" />
        </g>
        <g class="blood-cell blood-cell--stable">
          <path d="m62,59
            c5,0 5,3 5,3
            c0,2 -2,2 -2,2
            c-3,0 -3,-2 -3,-1
            c-2,-1 -2,0 -3,0
            c-2,0 -2,-2 -2,-2
            c0,-2 5,-2 5,-2" />
          <path d="m59,61
            c0,1 2,0 2,0
            c2,0 2,1 4,1" />
        </g>

        <g class="blood-cell blood-cell--critical">
          <path d="m44,65
            c5,0 5,3 5,3
            c0,2 -2,2 -2,2
            c-3,0 -3,-2 -3,-1
            c-2,-1 -2,0 -3,0
            c-2,0 -2,-2 -2,-2
            c0,-2 5,-2 5,-2" />
          <path d="m41,67
            c0,1 2,0 2,0
            c2,0 2,1 4,1" />
        </g>
      </g>
    </g>
  `;
}
