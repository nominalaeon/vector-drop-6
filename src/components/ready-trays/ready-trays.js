
import { mapGetters } from 'vuex';
import { mapState }   from 'vuex';

import _random from 'lodash/random';

import cActiveDrop  from '@components/active-drop/active-drop.vue';
import cReadyTray   from '@components/ready-tray/ready-tray.vue';

export default {
  name: 'ReadyTrays',

  components: {
    'active-drop': cActiveDrop,
    'ready-tray': cReadyTray
  },

  computed: {
    ...mapGetters([
      'tempo'
    ]),
    ...mapState({
      activeDrops: function mapActiveDrops(state) {
        return state.drops.active;
      },
      count: function mapReadyTraysThreshold(state) {
        return state.game.threshold.readyTrays;
      },
      dropNames: function mapDropNames(state) {
        return Object.keys(state.drops.all);
      },
      readyTrays: function mapReadyTrays(state) {
        return state.readyTrays.all;
      }
    })
  },

  data: function buildData() {
    return {
      selector: 'vd6-ready-trays'
    };
  },

  methods: {
    init: init,
    initTrays: initTrays,
    onDropPlayed: onDropPlayed,
    resetActiveDrop: resetActiveDrop,
    updateDrops: updateDrops
  },

  mounted: function onMounted() {
    this.resetActiveDrop();

    setTimeout(this.init.bind(this));
  },

  props: [
    'hasAlchemistPerk',
    'onCure',
    'updateScore'
  ]
};

/**
 * Init methods
 */

function init() {
  this.initTrays();

  console.info('ReadyTrays initialized', this);
}

function initTrays() {
  var data = {
    parent: this.$el,
    threshold: this.count
  };
  var readyTrays = _buildReadyTrays(data, [], 0);

  this.$store.dispatch('updateReadyTrays', readyTrays);
}

/**
 * General methods
 */

function onDropPlayed(dropId, readyTrayId) {
  if (!this.activeDrops[dropId]) return;

  this.readyTrays[readyTrayId].hasDrop = false;

  this.updateScore('dropPlayed');
  this.onCure(this.activeDrops[dropId].level);

  this.$store.dispatch('updateDropsActive', {
    method: 'remove',
    name: dropId
  });
}

function resetActiveDrop() {
  var dropCount = this.dropNames.length ? (this.dropNames.length - 1) : 0;
  var index = _random(0, dropCount);

  this.$store.dispatch('updateDropsActive', {
    method: 'add',
    name: this.dropNames[index]
  });
}

function updateDrops(dropId, readyTrayId, dropPlayed) {
  if (dropPlayed) {
    return setTimeout(this.onDropPlayed.bind(this, dropId, readyTrayId), this.tempo);
  }

  this.readyTrays[readyTrayId].hasDrop = true;

  this.updateScore('dropTrayed');
  this.resetActiveDrop();
}

/**
 * Private utility methods
 */

function _buildReadyTrays(data, readyTrays, index) {
  readyTrays.push({
    $parent: data.parent,
    hasDrop: false
  });

  index = index + 1;

  return index < data.threshold
    ? _buildReadyTrays(data, readyTrays, index)
    : readyTrays;
}
