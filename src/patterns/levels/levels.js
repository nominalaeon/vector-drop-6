
import _kebabCase from 'lodash/kebabCase';

export default {
  name: 'Levels',

  data: function buildData() {
    return {};
  },

  mounted: function onMounted() {
    console.info('Levels initialized', this);

    initLevels(this.$el, this.levels, Object.keys(this.levels));
  },

  methods: {

  },

  props: [
    'levels'
  ]
};

/**
 * General methods
 */

function initLevels($parent, levels, [key, ...keys]) {
  var level = levels[key];

  level.$root = $parent.querySelector(`.${level.selector.root}--${_kebabCase(key)}`);
  level.$svg = level.$root.querySelector('svg');

  level.animate();

  return keys.length
    ? initLevels($parent, levels, keys)
    : false;
}

/**
 * Private utility methods
 */
