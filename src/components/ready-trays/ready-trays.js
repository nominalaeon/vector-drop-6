
import { mapState } from 'vuex';

import cActiveDrop  from '@components/active-drop/active-drop.vue';
import cReadyTray   from '@components/ready-tray/ready-tray.vue';

export default {
  name: 'ReadyTrays',

  components: {
    'active-drop': cActiveDrop,
    'ready-tray': cReadyTray
  },

  computed: {
    ...mapState({
      activeDrops: function activeDrops(state) {
        return state.drops.active;
      },
      count: function count(state) {
        return state.game.threshold.readyTrays;
      },
      readyTrays: function readyTrays(state) {
        return state.readyTrays.all;
      }
    })
  },

  data: function data() {
    return {

    };
  },

  mounted: function mounted() {
    setTimeout(this.init.bind(this));
  },

  methods: {
    init: init,
    initTrays: initTrays
  },

  props: [
    'hasAlchemistPerk'
  ]
};

/**
 * General methods
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
