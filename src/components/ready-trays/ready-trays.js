
import Vue from 'vue';

import cActiveDrop from '@components/active-drop/active-drop.vue';

export default {
  name: 'ReadyTrays',

  components: {
    'active-drop': cActiveDrop
  },

  data: function data() {
    return {
      selector: 'vd6-ready-trays'
    };
  },

  mounted: function mounted() {
    setTimeout(this.init.bind(this));
  },

  methods: {
    init: init,
    selectElements: selectElements
  },

  props: [
    'count',
    'drop',
    'hasAlchemistPerk'
  ]
};

/**
 * General methods
 */

function init() {
  this.selectElements();

  console.info('ReadyTrays initialized', this);
}

function selectElements() {
  var $trays = [...this.$el.querySelectorAll(`.${this.selector}__tray--active`)];
  var val = $trays.map(($tray) => {
    return {
      coor: $tray.getBoundingClientRect(),
      parent: this.$el,
      root: $tray
    };
  });

  this.$store.dispatch('updateGameElement', {
    type: 'readyTrays',
    val: val
  });
}

/**
 * Private utility methods
 */
