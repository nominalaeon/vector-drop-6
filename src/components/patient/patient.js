
export default {
  name: 'Patient',

  data: function buildData() {
    return {
      selector: 'vd6-patient'
    };
  },

  methods: {
    hasBloom(ailment) {
      return this.levels[ailment].condition === this.levels[ailment].threshold.max;
    },
    init: init,
    resetElement: resetElement
  },

  mounted: function onMounted() {
    setTimeout(this.init.bind(this));
  },

  props: [
    'levels'
  ]
};

/**
 * General methods
 */

function init() {
  this.resetElement();
  console.info('Patient initialized', this);
}

function resetElement() {
  var $body = this.$el.querySelector(`.${this.selector}__body`);

  this.$store.dispatch('updatePatient', {
    prop: 'body',
    val: {
      coor: $body.getBoundingClientRect(),
      root: $body
    }
  });
}

/**
 * Private utility methods
 */
