/*!
 * VERSION: 0.2.1
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	_gsScope._gsDefine("easing.CustomBounce", ["easing.CustomEase"], function(CustomEase) {


		var _normalizeX = function (a) { //scales all the x values in an array [x, y, x, y...] AND rounds them to the closest hundredth (decimal)
				var l = a.length,
					s = 1 / a[l - 2],
					rnd = 1000,
					i;
				for (i = 2; i < l; i += 2) {
					a[i] = ((a[i] * s * rnd) | 0) / rnd;
				}
				a[l - 2] = 1; //in case there are any rounding errors. x should always end at 1.
			},

			CustomBounce = function(id, vars) {
				this.vars = vars = vars || {};
				if (vars.squash) {
					this.squash = new CustomEase(vars.squashID || (id + "-squash"));
				}
				CustomEase.call(this, id);
				this.bounce = this;
				this.update(vars);
			},
			p;

		CustomBounce.prototype = p = new CustomEase();
		p.constructor = CustomBounce;

		p.update = function(vars) {
			vars = vars || this.vars;
			var max = 0.999,
				decay = Math.min(max, vars.strength || 0.7),  // Math.min(0.999, 1 - 0.3 / (vars.strength || 1)),
				decayX = decay,
				gap = (vars.squash || 0) / 100,
				originalGap = gap,
				slope = 1 / 0.03,
				w = 0.2,
				h = 1,
				prevX = 0.1,
				path = [0, 0, 0.07, 0, 0.1, 1, 0.1, 1],
				squashPath = [0, 0, 0, 0, 0.1, 0, 0.1, 0],
				cp1, cp2, x, y, i, nextX, squishMagnitude;
			for (i = 0; i < 200; i++) {
				w *= decayX * ((decayX + 1) / 2);
				h *= decay * decay;
				nextX = prevX + w;
				x = prevX + w * 0.49;
				y = 1 - h;
				cp1 = prevX + h / slope;
				cp2 = x + (x - cp1) * 0.8;

				if (gap) {
					prevX += gap;
					cp1 += gap;
					x += gap;
					cp2 += gap;
					nextX += gap;
					squishMagnitude = gap / originalGap;
					squashPath.push(
						prevX - gap, 0,
						prevX - gap, squishMagnitude,
						prevX - gap / 2, squishMagnitude, //center peak anchor
						prevX, squishMagnitude,
						prevX, 0,
						prevX, 0, //base anchor
						prevX, squishMagnitude * -0.6,
						prevX + (nextX - prevX) / 6, 0,
						nextX, 0
					);
					path.push(prevX - gap, 1,
						prevX, 1,
						prevX, 1);
					gap *= decay * decay;
				}

				path.push(prevX, 1,
					cp1, y,
					x, y,
					cp2, y,
					nextX, 1,
					nextX, 1);

				decay *= 0.95;
				slope = h / (nextX - cp2);
				prevX = nextX;
				if (y > max) {
					break;
				}
			}

			if (vars.endAtStart) {
				x = -0.1;
				path.unshift(x, 1, x, 1, -0.07, 0);
				if (originalGap) {
					gap = originalGap * 2.5; //make the initial anticipation squash longer (more realistic)
					x -= gap;
					path.unshift(x, 1, x, 1, x, 1);
					squashPath.splice(0, 6);
					squashPath.unshift(x, 0, x, 0, x, 1, x + gap / 2, 1, x + gap, 1, x + gap, 0, x + gap, 0, x + gap, -0.6, x + gap + 0.033, 0);
					for (i = 0; i < squashPath.length; i+=2) {
						squashPath[i] -= x;
					}
				}
				for (i = 0; i < path.length; i+=2) {
					path[i] -= x;
					path[i+1] = 1 - path[i+1];
				}
			}

			if (gap) {
				_normalizeX(squashPath);
				squashPath[2] = "C" + squashPath[2];
				if (!this.squash) {
					this.squash = new CustomEase(vars.squashID || (this.id + "-squash"));
				}
				this.squash.setData("M" + squashPath.join(","));
			}

			_normalizeX(path);
			path[2] = "C" + path[2];
			return this.setData("M" + path.join(","));
		};

		CustomBounce.create = function(id, vars) {
			return new CustomBounce(id, vars);
		};

		CustomBounce.version = "0.2.1";

		return CustomBounce;

	}, true);


}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("./CustomEase.js");
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite", "CustomEase"], getGlobal);
	}
}("CustomBounce"));
/*!
 * VERSION: 0.2.2
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	_gsScope._gsDefine("easing.CustomEase", ["easing.Ease"], function(Ease) {

		var _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
			_needsParsingExp = /[cLlsS]/g,
			_bezierError = "CustomEase only accepts Cubic Bezier data.",
			_bezierToPoints = function (x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
				var x12 = (x1 + x2) / 2,
					y12 = (y1 + y2) / 2,
					x23 = (x2 + x3) / 2,
					y23 = (y2 + y3) / 2,
					x34 = (x3 + x4) / 2,
					y34 = (y3 + y4) / 2,
					x123 = (x12 + x23) / 2,
					y123 = (y12 + y23) / 2,
					x234 = (x23 + x34) / 2,
					y234 = (y23 + y34) / 2,
					x1234 = (x123 + x234) / 2,
					y1234 = (y123 + y234) / 2,
					dx = x4 - x1,
					dy = y4 - y1,
					d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx),
					d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx),
					length;
				if (!points) {
					points = [{x: x1, y: y1}, {x: x4, y: y4}];
					index = 1;
				}
				points.splice(index || points.length - 1, 0, {x: x1234, y: y1234});
				if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
					length = points.length;
					_bezierToPoints(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
					_bezierToPoints(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 1 + (points.length - length));
				}
				return points;
			},

			_pathDataToBezier = function (d) {
				var a = (d + "").replace(_scientific, function (m) {
							var n = +m;
							return (n < 0.0001 && n > -0.0001) ? 0 : n;
						}).match(_svgPathExp) || [], //some authoring programs spit out very small numbers in scientific notation like "1e-5", so make sure we round that down to 0 first.
					path = [],
					relativeX = 0,
					relativeY = 0,
					elements = a.length,
					l = 2,
					i, x, y, command, isRelative, segment, startX, startY, prevCommand, difX, difY;
				for (i = 0; i < elements; i++) {
					prevCommand = command;
					if (isNaN(a[i])) {
						command = a[i].toUpperCase();
						isRelative = (command !== a[i]); //lower case means relative
					} else { //commands like "C" can be strung together without any new command characters between.
						i--;
					}
					x = +a[i + 1];
					y = +a[i + 2];
					if (isRelative) {
						x += relativeX;
						y += relativeY;
					}
					if (!i) {
						startX = x;
						startY = y;
					}
					if (command === "M") {
						if (segment && segment.length < 8) { //if the path data was funky and just had a M with no actual drawing anywhere, skip it.
							path.length -= 1;
							l = 0;
						}
						relativeX = startX = x;
						relativeY = startY = y;
						segment = [x, y];
						l = 2;
						path.push(segment);
						i += 2;
						command = "L"; //an "M" with more than 2 values gets interpreted as "lineTo" commands ("L").

					} else if (command === "C") {
						if (!segment) {
							segment = [0, 0];
						}
						segment[l++] = x;
						segment[l++] = y;
						if (!isRelative) {
							relativeX = relativeY = 0;
						}
						segment[l++] = relativeX + a[i + 3] * 1; //note: "*1" is just a fast/short way to cast the value as a Number. WAAAY faster in Chrome, slightly slower in Firefox.
						segment[l++] = relativeY + a[i + 4] * 1;
						segment[l++] = relativeX = relativeX + a[i + 5] * 1;
						segment[l++] = relativeY = relativeY + a[i + 6] * 1;
						i += 6;

					} else if (command === "S") {
						if (prevCommand === "C" || prevCommand === "S") {
							difX = relativeX - segment[l - 4];
							difY = relativeY - segment[l - 3];
							segment[l++] = relativeX + difX;
							segment[l++] = relativeY + difY;
						} else {
							segment[l++] = relativeX;
							segment[l++] = relativeY;
						}
						segment[l++] = x;
						segment[l++] = y;
						if (!isRelative) {
							relativeX = relativeY = 0;
						}
						segment[l++] = relativeX = relativeX + a[i + 3] * 1;
						segment[l++] = relativeY = relativeY + a[i + 4] * 1;
						i += 4;

					} else if (command === "L" || command === "Z") {
						if (command === "Z") {
							x = startX;
							y = startY;
							segment.closed = true;
						}
						if (command === "L" || Math.abs(relativeX - x) > 0.5 || Math.abs(relativeY - y) > 0.5) {
							segment[l++] = relativeX + (x - relativeX) / 3;
							segment[l++] = relativeY + (y - relativeY) / 3;
							segment[l++] = relativeX + (x - relativeX) * 2 / 3;
							segment[l++] = relativeY + (y - relativeY) * 2 / 3;
							segment[l++] = x;
							segment[l++] = y;
							if (command === "L") {
								i += 2;
							}
						}
						relativeX = x;
						relativeY = y;
					} else {
						throw _bezierError;
					}

				}
				return path[0];
			},

			_findMinimum = function (values) {
				var l = values.length,
					min = 999999999999,
					i;
				for (i = 1; i < l; i += 6) {
					if (+values[i] < min) {
						min = +values[i];
					}
				}
				return min;
			},

			_normalize = function (values, height, originY) { //takes all the points and translates/scales them so that the x starts at 0 and ends at 1.
				if (!originY && originY !== 0) {
					originY = Math.max(+values[values.length-1], +values[1]);
				}
				var tx = +values[0] * -1,
					ty = -originY,
					l = values.length,
					sx = 1 / (+values[l - 2] + tx),
					sy = -height || ((Math.abs(+values[l - 1] - +values[1]) < 0.01 * (+values[l - 2] - +values[0])) ? _findMinimum(values) + ty : +values[l - 1] + ty),
					i;
				if (sy) { //typically y ends at 1 (so that the end values are reached)
					sy = 1 / sy;
				} else { //in case the ease returns to its beginning value, scale everything proportionally
					sy = -sx;
				}
				for (i = 0; i < l; i += 2) {
					values[i] = (+values[i] + tx) * sx;
					values[i + 1] = (+values[i + 1] + ty) * sy;
				}
			},

			_getRatio = function (p) {
				var point = this.lookup[(p * this.l) | 0] || this.lookup[this.l - 1];
				if (point.nx < p) {
					point = point.n;
				}
				return point.y + ((p - point.x) / point.cx) * point.cy;
			},


			CustomEase = function (id, data, config) {
				this._calcEnd = true;
				this.id = id;
				if (id) {
					Ease.map[id] = this;
				}
				this.getRatio = _getRatio; //speed optimization, faster lookups.
				this.setData(data, config);
			},
			p = CustomEase.prototype = new Ease();

		p.constructor = CustomEase;

		p.setData = function(data, config) {
			data = data || "0,0,1,1";
			var values = data.match(_numbersExp),
				closest = 1,
				points = [],
				l, a1, a2, i, inc, j, point, prevPoint, p, precision;
			config = config || {};
			precision = config.precision || 1;
			this.data = data;
			this.lookup = [];
			this.points = points;
			this.fast = (precision <= 1);
			if (_needsParsingExp.test(data) || (data.indexOf("M") !== -1 && data.indexOf("C") === -1)) {
				values = _pathDataToBezier(data);
			}
			l = values.length;
			if (l === 4) {
				values.unshift(0, 0);
				values.push(1, 1);
				l = 8;
			} else if ((l - 2) % 6) {
				throw _bezierError;
			}
			if (+values[0] !== 0 || +values[l - 2] !== 1) {
				_normalize(values, config.height, config.originY);
			}

			this.rawBezier = values;

			for (i = 2; i < l; i += 6) {
				a1 = {x: +values[i - 2], y: +values[i - 1]};
				a2 = {x: +values[i + 4], y: +values[i + 5]};
				points.push(a1, a2);
				_bezierToPoints(a1.x, a1.y, +values[i], +values[i + 1], +values[i + 2], +values[i + 3], a2.x, a2.y, 1 / (precision * 200000), points, points.length - 1);
			}
			l = points.length;
			for (i = 0; i < l; i++) {
				point = points[i];
				prevPoint = points[i - 1] || point;
				if (point.x > prevPoint.x || (prevPoint.y !== point.y && prevPoint.x === point.x) || point === prevPoint) { //if a point goes BACKWARD in time or is a duplicate, just drop it.
					prevPoint.cx = point.x - prevPoint.x; //change in x between this point and the next point (performance optimization)
					prevPoint.cy = point.y - prevPoint.y;
					prevPoint.n = point;
					prevPoint.nx = point.x; //next point's x value (performance optimization, making lookups faster in getRatio()). Remember, the lookup will always land on a spot where it's either this point or the very next one (never beyond that)
					if (this.fast && i > 1 && Math.abs(prevPoint.cy / prevPoint.cx - points[i - 2].cy / points[i - 2].cx) > 2) { //if there's a sudden change in direction, prioritize accuracy over speed. Like a bounce ease - you don't want to risk the sampling chunks landing on each side of the bounce anchor and having it clipped off.
						this.fast = false;
					}
					if (prevPoint.cx < closest) {
						if (!prevPoint.cx) {
							prevPoint.cx = 0.001; //avoids math problems in getRatio() (dividing by zero)
							if (i === l - 1) { //in case the final segment goes vertical RIGHT at the end, make sure we end at the end.
								prevPoint.x -= 0.001;
								closest = Math.min(closest, 0.001);
								this.fast = false;
							}
						} else {
							closest = prevPoint.cx;
						}
					}
				} else {
					points.splice(i--, 1);
					l--;
				}
			}
			l = (1 / closest + 1) | 0;
			this.l = l; //record for speed optimization
			inc = 1 / l;
			j = 0;
			point = points[0];
			if (this.fast) {
				for (i = 0; i < l; i++) { //for fastest lookups, we just sample along the path at equal x (time) distance. Uses more memory and is slightly less accurate for anchors that don't land on the sampling points, but for the vast majority of eases it's excellent (and fast).
					p = i * inc;
					if (point.nx < p) {
						point = points[++j];
					}
					a1 = point.y + ((p - point.x) / point.cx) * point.cy;
					this.lookup[i] = {x: p, cx: inc, y: a1, cy: 0, nx: 9};
					if (i) {
						this.lookup[i - 1].cy = a1 - this.lookup[i - 1].y;
					}
				}
				this.lookup[l - 1].cy = points[points.length - 1].y - a1;
			} else { //this option is more accurate, ensuring that EVERY anchor is hit perfectly. Clipping across a bounce, for example, would never happen.
				for (i = 0; i < l; i++) { //build a lookup table based on the smallest distance so that we can instantly find the appropriate point (well, it'll either be that point or the very next one). We'll look up based on the linear progress. So it's it's 0.5 and the lookup table has 100 elements, it'd be like lookup[Math.floor(0.5 * 100)]
					if (point.nx < i * inc) {
						point = points[++j];
					}
					this.lookup[i] = point;
				}

				if (j < points.length - 1) {
					this.lookup[i-1] = points[points.length-2];
				}
			}
			this._calcEnd = (points[points.length-1].y !== 1 || points[0].y !== 0); //ensures that we don't run into floating point errors. As long as we're starting at 0 and ending at 1, tell GSAP to skip the final calculation and use 0/1 as the factor.
			return this;
		};

		p.getRatio = _getRatio;

		p.getSVGData = function(config) {
			return CustomEase.getSVGData(this, config);
		};

		CustomEase.create = function (id, data, config) {
			return new CustomEase(id, data, config);
		};

		CustomEase.version = "0.2.2";

		CustomEase.bezierToPoints = _bezierToPoints;
		CustomEase.get = function (id) {
			return Ease.map[id];
		};
		CustomEase.getSVGData = function(ease, config) {
			config = config || {};
			var rnd = 1000,
				width = config.width || 100,
				height = config.height || 100,
				x = config.x || 0,
				y = (config.y || 0) + height,
				e = config.path,
				a, slope, i, inc, tx, ty, precision, threshold, prevX, prevY;
			if (config.invert) {
				height = -height;
				y = 0;
			}
			ease = ease.getRatio ? ease : Ease.map[ease] || console.log("No ease found: ", ease);
			if (!ease.rawBezier) {
				a = ["M" + x + "," + y];
				precision = Math.max(5, (config.precision || 1) * 200);
				inc = 1 / precision;
				precision += 2;
				threshold = 5 / precision;
				prevX = (((x + inc * width) * rnd) | 0) / rnd;
				prevY = (((y + ease.getRatio(inc) * -height) * rnd) | 0) / rnd;
				slope = (prevY - y) / (prevX - x);
				for (i = 2; i < precision; i++) {
					tx = (((x + i * inc * width) * rnd) | 0) / rnd;
					ty = (((y + ease.getRatio(i * inc) * -height) * rnd) | 0) / rnd;
					if (Math.abs((ty - prevY) / (tx - prevX) - slope) > threshold || i === precision - 1) { //only add points when the slope changes beyond the threshold
						a.push(prevX + "," + prevY);
						slope = (ty - prevY) / (tx - prevX);
					}
					prevX = tx;
					prevY = ty;
				}
			} else {
				a = [];
				precision = ease.rawBezier.length;
				for (i = 0; i < precision; i += 2) {
					a.push((((x + ease.rawBezier[i] * width) * rnd) | 0) / rnd + "," + (((y + ease.rawBezier[i + 1] * -height) * rnd) | 0) / rnd);
				}
				a[0] = "M" + a[0];
				a[1] = "C" + a[1];
			}
			if (e) {
				(typeof(e) === "string" ? document.querySelector(e) : e).setAttribute("d", a.join(" "));
			}
			return a.join(" ");
		};

		return CustomEase;

	}, true);

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite"], getGlobal);
	}
}("CustomEase"));
/*!
 * VERSION: 0.2.1
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	_gsScope._gsDefine("easing.CustomWiggle", ["easing.CustomEase", "easing.Ease"], function(CustomEase, Ease) {


		var eases = {
				easeOut: new CustomEase("", "M0,1,C0.7,1,0.6,0,1,0"),
				easeInOut: new CustomEase("", "M0,0,C0.104,0,0.242,1,0.444,1,0.644,1,0.608,0,1,0"),
				anticipate: new CustomEase("", "M0,0,C0,0.222,0.024,0.386,0.06,0.402,0.181,0.455,0.647,0.646,0.7,0.67,0.9,0.76,1,0.846,1,1"),
				uniform: new CustomEase("", "M0,0,C0,0.95,0.01,1,0.01,1,0.01,1,1,1,1,1,1,1,1,0.01,1,0")
			},
			_linearEase = new CustomEase(), //linear
			_parseEase = function(ease, invertNonCustomEases) {
				ease = ease.getRatio ? ease : Ease.map[ease] || new CustomEase("", ease);
				return (ease.rawBezier || !invertNonCustomEases) ? ease : {getRatio:function(n) { return 1 - ease.getRatio(n); }};
			},


			CustomWiggle = function(id, vars) {
				this.vars = vars || {};
				CustomEase.call(this, id);
				this.update(this.vars);
			},
			p;

		CustomWiggle.prototype = p = new CustomEase();
		p.constructor = CustomWiggle;

		p.update = function(vars) {
			vars = vars || this.vars;
			var wiggles = (vars.wiggles || 10) | 0,
				inc = 1 / wiggles,
				x = inc / 2,
				anticipate = (vars.type === "anticipate"),
				yEase = eases[vars.type] || eases.easeOut,
				xEase = _linearEase,
				rnd = 1000,
				nextX, nextY, angle, handleX, handleY, easedX, y, path, i;
			if (anticipate) { //the anticipate ease is actually applied on the x-axis (timing) and uses easeOut for amplitude.
				xEase = yEase;
				yEase = eases.easeOut;
			}
			if (vars.timingEase) {
				xEase = _parseEase(vars.timingEase);
			}
			if (vars.amplitudeEase) {
				yEase = _parseEase(vars.amplitudeEase, true);
			}
			easedX = xEase.getRatio(x);
			y = anticipate ? -yEase.getRatio(x) : yEase.getRatio(x);
			path = [0, 0, easedX / 4, 0, easedX / 2, y, easedX, y];

			if (vars.type === "random") { //if we just select random values on the y-axis and plug them into the "normal" algorithm, since the control points are always straight horizontal, it creates a bit of a slowdown at each anchor which just didn't seem as desirable, so we switched to an algorithm that bends the control points to be more in line with their context.
				path.length = 4;
				nextX = xEase.getRatio(inc);
				nextY = Math.random() * 2 - 1;
				for (i = 2; i < wiggles; i++) {
					x = nextX;
					y = nextY;
					nextX = xEase.getRatio(inc * i);
					nextY = Math.random() * 2 - 1;
					angle = Math.atan2(nextY - path[path.length - 3], nextX - path[path.length - 4]);
					handleX = Math.cos(angle) * inc;
					handleY = Math.sin(angle) * inc;
					path.push(x - handleX, y - handleY, x, y, x + handleX, y + handleY);
				}
				path.push(nextX, 0, 1, 0);
			} else {
				for (i = 1; i < wiggles; i++) {
					path.push(xEase.getRatio(x + inc / 2), y);
					x += inc;
					y = ((y > 0) ? -1 : 1) * (yEase.getRatio(i * inc));
					easedX = xEase.getRatio(x);
					path.push(xEase.getRatio(x - inc / 2), y, easedX, y);
				}
				path.push(xEase.getRatio(x + inc / 4), y, xEase.getRatio(x + inc / 4), 0, 1, 0);
			}
			i = path.length;
			while (--i > -1) {
				path[i] = ((path[i] * rnd) | 0) / rnd; //round values to avoid odd strings for super tiny values
			}
			path[2] = "C" + path[2];
			this.setData("M" + path.join(","));
		};

		CustomWiggle.create = function (id, vars) {
			return new CustomWiggle(id, vars);
		};

		CustomWiggle.version = "0.2.1";
		CustomWiggle.eases = eases;

		return CustomWiggle;

	}, true);


}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("./CustomEase.js");
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite", "CustomEase"], getGlobal);
	}
}("CustomWiggle"));
/*!
 * VERSION: 1.16.0
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	_gsScope._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
		
		var w = (_gsScope.GreenSockGlobals || _gsScope),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true), 
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease(),
			SteppedEase, ExpoScaleEase, RoughEase, _createElastic;
			
		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? (p === 1 ? 0 : 1 - (p = (p - this._p3) / this._p1) * p) : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p); //added p === 1 ? 0 to avoid floating point rounding errors from affecting the final value, like 1 - 0.7 = 0.30000000000000004 instead of 0.3
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);
		
		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps, immediateStart) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + (immediateStart ? 0 : 1);
				this._p3 = immediateStart ? 1 : 0;
			}, true);
		p = SteppedEase.prototype = new Ease();	
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return (((this._p2 * p) | 0) + this._p3) * this._p1;
		};
		p.config = SteppedEase.config = function(steps, immediateStart) {
			return new SteppedEase(steps, immediateStart);
		};


		//ExpoScaleEase
		ExpoScaleEase = _class("easing.ExpoScaleEase", function(start, end, ease) {
			this._p1 = Math.log(end / start);
			this._p2 = end - start;
			this._p3 = start;
			this._ease = ease;
		}, true);
		p = ExpoScaleEase.prototype = new Ease();
		p.constructor = ExpoScaleEase;
		p.getRatio = function(p) {
			if (this._ease) {
				p = this._ease.getRatio(p);
			}
			return (this._p3 * Math.exp(this._p1 * p) - this._p3) / this._p2;
		};
		p.config = ExpoScaleEase.config = function(start, end, ease) {
			return new ExpoScaleEase(start, end, ease);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof Ease) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new Ease();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = (amplitude >= 1) ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
					this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
					this._p2 = _2PI / this._p2; //precalculate to optimize
				}, true),
				p = C.prototype = new Ease();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * this._p2 ) * 0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return Ease.map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");
		
		return Back;
		
	}, true);

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function() {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope);
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite"], getGlobal);
	}
}());