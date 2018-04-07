
export default {
  name: 'TitleMenu',

  data: function buildData() {
    return {
      menuItems: []
    };
  },

  mounted: function onMounted() {
    this.menuItems = _buildTitleMenu(this.$router, this.$store);

    console.info('TitleMenu initialized', this);

    Object.assign(this, selectElements(this.$el));

    return animate(this.$el);
  }
}

function animate(el) {
  var dur = 1.2;
  var del = dur * 4;
  var blur = `${window.outerHeight * 0.0025}px`;

  TweenLite.to(el, dur, {
    color: 'rgba(250, 250, 250, 1)',
    delay: del,
    textShadow: `0 0 ${blur} rgba(250, 250, 250, 0.8)`
  });
}

function selectElements(el) {
  return {
    bg: el.querySelector('.vd6-title-card__path--bg')
  };
}

/**
 * Private utility methods
 */

function _buildTitleMenu(router, store) {
  return [{
    action: () => {
      store.dispatch('updatePlayerId', 'PL 1');
      router.push(`/stage/omega-phase`);
    },
    disabled: false,
    label: 'New Game'
  }, {
    action: () => {
      router.push(`/stage-select`);
    },
    disabled: true,
    label: 'Stage Select'
  }];
}
