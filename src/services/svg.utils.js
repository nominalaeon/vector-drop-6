
import _random from 'lodash/random';
import _round from 'lodash/round';

var CENTER = {
  x: 50,
  y: 50
};

var SvgUtils = {
  buildBounceFrames: buildBounceFrames,
  buildMorphFrames: buildMorphFrames,
  buildQuadraticBeziers: buildQuadraticBeziers,
  buildRotationFrames: buildRotationFrames,
  calculateRadialCoordinates: calculateRadialCoordinates
};

export default SvgUtils;

/**
 * @param {Object} data[durMin, durMax, position, target, tl], bounces[skewX, x, y], index
 */
function buildBounceFrames(data, bounces, index) {
  var duration = index === 0 ? 0 : data.duration;
  var position = index === bounces.length - 1 ? 0.5 : data.position;

  var bounce = bounces[index];

  if (data.isEratic) {
    duration = _round(_random(data.durMin, data.durMax), 2);
  }

  data.tl.to(data.target, duration, {
    ease: Back.easeInOut,
    skewX: bounce.skewX,
    x: bounce.x,
    y: bounce.y
  }, `+=${position}`);

  index = index + 1;

  return bounces[index]
    ? buildBounceFrames(data, bounces, index)
    : false;
}

/**
 * @param {Object} data[duration, position, target, tl]
 * @param {String} paths
 * @param {Number} index
 */
function buildMorphFrames(data, paths, index) {
  var duration = index === 0 ? 0 : data.duration;
  var position = index === 0 ? 0 : data.position;

  data.tl.to(data.target, duration, {
    morphSVG: {
      shape: paths[index],
      shapeIndex: 0
    },
    ease: Back.easeInOut
  }, `+=${position}`);

  index = index + 1;

  return paths[index]
    ? buildMorphFrames(data, paths, index)
    : data.label;
}

/**
 * @param {Array} beziers
 * @param {Object} data[count, rad, radDelta, startDelta, startPct]
 */
function buildQuadraticBeziers(beziers, data) {
  var startPct = (data.startPct + (data.startDelta / 4)) / 100;
  var startRad = data.rad + data.radDelta;
  var startCoor = calculateRadialCoordinates(startPct, CENTER, startRad);
  var midPct = (data.startPct + (data.startDelta / 2)) / 100;
  var midCoor = calculateRadialCoordinates(midPct, CENTER, data.rad);
  var endPct = (data.startPct + data.startDelta) / 100;
  var endCoor = calculateRadialCoordinates(endPct, CENTER, data.rad);

  beziers.push(`Q${startCoor.x},${startCoor.y} ${midCoor.x},${midCoor.y} T${endCoor.x},${endCoor.y}`);

  data.count = data.count - 1;
  data.startPct = data.startPct + data.startDelta;

  return data.count > 0
    ? buildQuadraticBeziers(beziers, data)
    : beziers;
}

/**
 * @param {Object} data[callback, center[x,y], duration, position, rotation, target, tl], paths, index
 */
function buildRotationFrames(data) {
  data.tl.eventCallback('onComplete', null);
  data.tl.eventCallback('onComplete', data.callback.bind(null, data.tl));

  data.tl.to(data.target, data.duration, {
    rotation: `+=${data.rotation}`,
    svgOrigin: `${data.center.x} ${data.center.y}`
  }, `+=${data.position}`);
}

function calculateRadialCoordinates(pct, center, radius) {
  return {
    x: _round(center.x + radius * Math.cos(2 * Math.PI * pct), 2),
    y: _round(center.y + radius * Math.sin(2 * Math.PI * pct), 2)
  };
}
