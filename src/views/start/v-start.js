
import Vue        from 'vue';

import cTitleCard from '@components/title-card/title-card.vue';
import cTitleMenu from '@components/title-menu/title-menu.vue';

export default {
  name: 'StartComponent',
  components: {
    'title-card': cTitleCard,
    'title-menu': cTitleMenu
  },

  data: function buildData() {
    return {
      titleCard: {
        height: 100,
        width: 200
      }
    };
  },

  mounted: function onMounted() {
    console.info('Start mounted', this);

    Object.assign(this.titleCard, selectTitleCardElements(this.$el));
    Object.assign(this.titleCard, resizeTitleCardElements(this.titleCard.root));
  }
}

/**
 * General methods
 */

function resizeTitleCardElements(el) {
  var dimensions = el ? el.getBoundingClientRect() : {
    height: 0,
    width: 0
  };
  var hasRoomAcross = dimensions.width > (dimensions.height * 2);

  return {
    height: hasRoomAcross ? dimensions.height     : dimensions.width / 2,
    width: hasRoomAcross  ? dimensions.height * 2 : dimensions.width
  };
}

function selectTitleCardElements(el) {
  return {
    root: el.querySelector('.vd6-title-card')
  };
}
