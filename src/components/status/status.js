
export default {
  name: 'Status',

  data: function data() {
    return {};
  },

  mounted: function mounted() {
    console.info('Status initialized', this);
  },

  methods: {

  },

  props: [
    'painCount',
    'progressCount'
  ]
};

/**
 * General methods
 */

/**
 * Private utility methods
 */
