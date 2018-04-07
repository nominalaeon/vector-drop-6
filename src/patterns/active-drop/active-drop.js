
import { mapState } from 'vuex';

export default {
  name: 'ActiveDrop',

  computed: {
    ...mapState({
      patientTarget: function mapPatientTarget(state) {
        return {
          'patient': state.patient.body
        };
      },
      readyTrayTargets: function mapReadyTrayTargets(state) {
        return state.readyTrays.all || {};
      }
    }),

    name: function buildMapName() {
      return this.drop ? this.drop.name : '';
    }
  },

  data: function buildData() {
    return {
      threshold: '25%',
      selector: 'vd6-active-drop'
    };
  },

  mounted: function onMounted() {
    setTimeout(this.init.bind(this));
  },

  methods: {
    detectHit: detectHit,
    init: init,
    initDraggable: initDraggable,
    resetElement: resetElement
  },

  props: [
    'activeSelector',
    'drop',
    'updateDrops'
  ],

  watch: {
    readyTrayTargets: function watchReadyTrayTargets(newVal) {
      this.initDraggable();
    }
  }
};

/**
 * Init methods
 */

function init() {
  this.resetElement();
  this.initDraggable();

  console.info('ActiveDrop initialized', this.drop.id, this);
}

function initDraggable() {
  this.draggable && this.draggable.kill();

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

/**
 * General methods
 */

function detectHit() {
  var data = {
    hitTest: this.draggable.hitTest,
    threshold: this.threshold
  };
  var patientHit = this.readyTray ? _detectHit(data, false, this.patientTarget, Object.keys(this.patientTarget)) : false;
  var readyTrayHit = false;

  if (patientHit) {
    this.updateDrops(this.drop.id, this.readyTray.id, true);

    return patientHit;
  }

  if (this.readyTray) {
    return this.readyTray;
  }

  readyTrayHit = _detectHit(data, false, this.readyTrayTargets, Object.keys(this.readyTrayTargets));

  if (!readyTrayHit || readyTrayHit.hasDrop) {
    return false;
  }

  this.readyTray = readyTrayHit;

  this.updateDrops(this.drop.id, this.readyTray.id, false);

  return this.readyTray;
}

function onSnap(dir, delta) {
  var targetHit = this.detectHit();

  if (!targetHit) return 0;

  targetHit.hasDrop = true;

  return targetHit.coor[dir] - this.drop.coor[dir];
}

function resetElement() {
  this.drop.coor = this.$el.getBoundingClientRect();
  this.drop.root = this.$el;
}

/**
 * Private utility methods
 */

function _detectHit(data, targetHit, targets, [key, ...keys]) {
  var target = targets[key];

  if (data.hitTest(target.root, data.threshold)) {
    targetHit = target;
  }

  return keys.length
    ? _detectHit(data, targetHit, targets, keys)
    : targetHit;
}
