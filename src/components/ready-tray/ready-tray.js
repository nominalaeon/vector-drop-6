
export default {
  name: 'ReadyTray',

  data: function data() {
    return {

    };
  },

  mounted: function mounted() {
    setTimeout(this.init.bind(this));
  },

  methods: {
    init: init,
    resetElement: resetElement
  },

  props: [
    'tray'
  ]
};

/**
 * General methods
 */

function init() {
  this.resetElement();

  console.info('ReadyTray initialized', this);
}

function resetElement() {
  this.tray.coor = this.$el.getBoundingClientRect();
  this.tray.root = this.$el;
}

/**
 * Private utility methods
 */
