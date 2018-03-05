
export default class Timer {
  constructor(props) {
    var level = _initProps({ _vm: {} }, props, Object.keys(props));
    Object.assign(this, level);
  }

  get loops() {
    return this._vm.loops || 0;
  }
  set loops(loops) {
    this._vm.loops = loops || 0;
  }

  get startTime() {
    return this._vm.startTime || 0;
  }
  set startTime(startTime) {
    this._vm.startTime = startTime || 0;
  }

  get stopTimer() {
    return this._vm.stopTimer || false;
  }
  set stopTimer(stopTimer) {
    this._vm.stopTimer = stopTimer || false;
  }

  get time() {
    return this._vm.time || 0;
  }
  set time(time) {
    this._vm.time = time;
  }

  incrementTimer(hasStartTime, timestamp) {
    var floorTime = Math.floor(timestamp);
    var newTime = floorTime - this.startTime;

    if (!hasStartTime) {
      this.startTime = floorTime;
      hasStartTime = true;
    }

    if (floorTime % this.tempo < 18) {
      this.time = newTime;
    }

    if (this.time > this.threshold) {
      console.info('Timer threshold', this.loops, this.time, this.threshold);
      let loops = this.loops;
      this.loops = loops + 1;
      this.startTime = floorTime;
      this.time = 0;
    }

    return !this.stopTimer
      ? window.requestAnimationFrame(this.incrementTimer.bind(this, hasStartTime))
      : this.time;
  }

  reset() {
    this.loops = 0;
    this.startTime = 0;
    this.stopTimer = false;
    this.time = 0;
  }

  start(threshold, tempo) {
    this.reset();

    this.tempo = tempo;
    this.threshold = threshold;

    console.info('Timer start', this.threshold);

    return window.requestAnimationFrame(this.incrementTimer.bind(this, false));
  }

  stop() {
    this.stopTimer = true;
  }
};

/**
 * General methods
 */

/**
 * Private methods
 */

function _initProps(stage, props, [propName, ...propNames]) {
  if (!propName) return stage;

  stage[propName] = props[propName];

  return propNames.length
    ? _initProps(stage, props, propNames)
    : stage;
}
