
export default {
  name: 'Levels',

  data: function data() {
    return {};
  },

  mounted: function mounted() {
    console.info('Levels initialized', this);
  },

  methods: {

  },

  props: [
    'levels'
  ],

  watch: {
    levels: {
      handler: onUpdateLevels,
      deep: true
    }
  }
};

/**
 * General methods
 */

function onUpdateLevels(newVal) {
  console.log('onUpdateLevels', newVal, this);
}

/**
 * Private utility methods
 */
