
export default {
  name: 'EffectScreen',
  props: {

  },

  data: function buildData() {
    return {
      selector: 'vd6-effect-screen'
    }
  },

  mounted: function onMounted() {
    this.selectElements();
    this.bindEvents();

    console.info('EffectScreen initialized', this);
  },

  methods: {
    bindEvents: bindEvents,
    selectElements: selectElements
  }
};

/**
 * General methods
 */

function bindEvents() {
  window.addEventListener('click', onClick.bind(this), { passive: true });
}

function onClick(event) {
  TweenLite.set(this.ping.root, {
    x: event.x - (this.ping.width / 2),
    y: event.y - (this.ping.height / 2)
  });

  _buildPing(this.ping.root);
}

function selectElements() {
  var pingRoot = this.$el.querySelector(`.${this.selector}__ping`);

  this.ping = {
    root: pingRoot,
    width: pingRoot.offsetWidth,
    height: pingRoot.offsetHeight
  };
}

/**
 * Private utility methods
 */

function _buildPing(el) {
  var tl = new TimelineLite({ repeat: false });

  tl.to(el, 0.25, {
    ease: Elastic.easeOut.config(0.75, 0.25),
    scaleX: 1,
    scaleY: 1
  });
  tl.to(el, 0.25, {
    scaleX: 0,
    scaleY: 0
  });

  return tl;
}
