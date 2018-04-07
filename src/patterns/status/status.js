
export default {
  name: 'Status',

  data: function buildData() {
    return {};
  },

  mounted: function onMounted() {
    console.info('Status initialized', this);
  },

  methods: {

  },

  props: [
    'pain',
    'painCount',
    'progress',
    'progressCount'
  ]
};

/**
 * General methods
 */

/**
 * Private utility methods
 */
