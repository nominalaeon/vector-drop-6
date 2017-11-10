
import Vue        from 'vue';
import Component  from 'vue-class-component';

import cTitleCard from '../title-card/c-title-card.vue';
import cTitleMenu from '../title-menu/c-title-menu.vue';

import * as T     from '../../types/common';
import * as TC    from '../title-card/i-title-card';

@Component({
  name: 'StartComponent',
  components: {
    'title-card': cTitleCard,
    'title-menu': cTitleMenu
  }
})

class Start extends Vue {
  $titleCard: HTMLElement;
  titleCard: TC.TitleCard = {
    height: 100,
    width: 200
  };

  mounted() {
    console.info('Start initialized', this);

    this.selectElements();
    this.resize();
  }

  resize() {
    this.resizeTitleCard();
  }

  resizeTitleCard() {
    var dim = this.$titleCard.getBoundingClientRect();
    var hasRoomAcross = dim.width > (dim.height * 2);
    
    this.titleCard.width  = hasRoomAcross ? dim.height * 2  : dim.width;
    this.titleCard.height = hasRoomAcross ? dim.height      : dim.width / 2;
  }

  selectElements() {
    this.$titleCard = <HTMLElement> this.$el.querySelector('.vd6-title-card');
  }
};

export default Start;
