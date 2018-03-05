
import { mapState } from 'vuex';

export default {
  name: 'ActiveDrop',

  computed: {
    ...mapState({
      $drop: function drop(state) {
        return state.game.$activeDrop || {};
      },
      $targets: function targets(state) {
        return state.game.$readyTrays || [];
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
    selectElements: selectElements
  },

  props: [
    'drop'
  ],

  watch: {
    $targets: function watchTargets(newVal) {
      if (!newVal.length) return;

      this.initDraggable();
    }
  }
};

/**
 * General methods
 */

function init() {
  this.selectElements();

  console.info('ActiveDrop initialized', this);
}

function initDraggable() {
  this.draggable = Draggable.create(this.$drop.root, {
    // bounds: this.$drop.parent.parentNode,
    bounds: document.querySelector('body'),
    edgeResistance: 0.75,
    throwProps: true,
    type: "x,y",
    snap: {
      x: onSnap.bind(this, 'x'),
      y: onSnap.bind(this, 'y')
    }
  });
}

function onSnap(dir, delta) {
  var $targetHit = false;

  this.$targets.forEach(($target) => {
    var isHit = this.draggable[0].hitTest($target.root, this.threshold);

    if ($targetHit || !isHit) return;

    $targetHit = $target;
  });

  if (!$targetHit) return delta;

  console.log('onSnap', $targetHit, dir, delta);

  return dir === 'x'
    ? $targetHit.coor.left - this.$drop.parent.offsetLeft
    : $targetHit.coor.top - $targetHit.coor.height;
}

function selectElements() {
  this.$store.dispatch('updateGameElement', {
    type: 'activeDrop',
    val: {
      coor: this.$el.getBoundingClientRect(),
      parent: this.$el.parentNode,
      root: this.$el
    }
  });
}

/**
 * Private utility methods
 */
