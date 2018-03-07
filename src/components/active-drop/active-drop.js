
import { mapState } from 'vuex';

export default {
  name: 'ActiveDrop',

  computed: {
    ...mapState({
      targets: function targets(state) {
        return state.readyTrays.all || {};
      }
    }),

    name: function name() {
      return this.drop ? this.drop.name : '';
    }
  },

  data: function data() {
    return {
      threshold: '50%',
      selector: 'vd6-active-drop'
    };
  },

  mounted: function mounted() {
    setTimeout(this.init.bind(this));
  },

  methods: {
    init: init,
    initDraggable: initDraggable,
    resetElement: resetElement
  },

  props: [
    'drop'
  ],

  watch: {
    targets: function watchTargets(newVal) {
      this.initDraggable();
    }
  }
};

/**
 * General methods
 */

function init() {
  this.resetElement();

  console.info('ActiveDrop initialized', this);
}

function initDraggable() {
  this.draggable = Draggable.create(this.$el, {
    bounds: document.querySelector('body'),
    edgeResistance: 0.75,
    throwProps: true,
    type: "x,y",
    snap: {
      x: onSnap.bind(this, 'x'),
      y: onSnap.bind(this, 'y')
    }
  })[0];
}

function onSnap(dir, delta) {
  var data = {
    hitTest: this.draggable.hitTest,
    threshold: this.threshold
  };
  var targetHit = _detectTargetHit(data, false, this.targets, Object.keys(this.targets));

  if (!targetHit) return delta;

  targetHit.hasDrop = true;

  return dir === 'x'
    ? targetHit.coor.left - targetHit.coor.x
    : targetHit.coor.top - targetHit.coor.height;
}

function resetElement() {
  this.drop.coor = this.$el.getBoundingClientRect();
  this.drop.root = this.$el;
}

/**
 * Private utility methods
 */

function _detectTargetHit(data, targetHit, targets, [key, ...keys]) {
  var target = targets[key];

  if (data.hitTest(target.root, data.threshold)) {
    targetHit = target;
  }

  return keys.length
    ? _detectTargetHit(data, targetHit, targets, keys)
    : targetHit;


}
