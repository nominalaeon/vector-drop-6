
export default {
  name: 'GridOverlay',

  computed: {
    displayPaths: {
      get: function getDisplayPaths() {
        return this._displayPaths || [];
      },
      set: function setDisplayPaths(displayPaths) {
        this._displayPaths = displayPaths;
      }
    }
  },

  data: function buildData() {
    return {
      _displayPaths: {}
    };
  },

  mounted: function onMounted() {
    this.init();

    console.info('Grid initialized', this);
  },

  methods: {
    init: init
  }

}

/**
 * General methods
 */

function init() {
  var coor = this.$el.getBoundingClientRect();
  var center = {
    x: coor.width / 2,
    y: coor.height / 2
  };

  this.displayPaths = createGridLines(coor, center);
}

function createGridLines(coor, center) {
  var pcts = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

  var hLines = pcts.map(createGridLine.bind(null, coor, center, 'horizontal'));
  var vLines = pcts.map(createGridLine.bind(null, coor, center, 'vertical'));
  var circles = pcts.map(createGridCircle.bind(null, coor, center));

  return hLines.concat(vLines, circles);
}

function createGridCircle(coor, center, pct) {
  var delta = {
    x: (coor.height * pct),
    y: (coor.height * pct)
  };

  var path = {
    data: [
      `m${center.x},${center.y - (delta.y)}`,
      `c${delta.x},0 ${delta.x},${delta.y} ${delta.x},${delta.y}`,
      `c0,${delta.y} -${delta.x},${delta.y}, -${delta.x},${delta.y}`,
      `c-${delta.x},0 -${delta.x},-${delta.y} -${delta.x},-${delta.y}`,
      `c0,-${delta.y} ${delta.x},-${delta.y} ${delta.x},-${delta.y}`
    ].join(' '),
    dir: 'circle'
  };

  return path;
}

function createGridLine(coor, center, dir, pct) {
  var delta = {
    x: (coor.width * pct),
    y: (coor.height * pct)
  };
  var path = {
    data: dir === 'horizontal' ? [
      `m0,${delta.y}`,
      `l${coor.width},0`
    ].join(' ') : [
      `m${delta.x},0`,
      `l0,${coor.height}`
    ].join(' '),
    dir: dir
  };

  return path;
}
