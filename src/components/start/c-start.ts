
import Vue        from 'vue';
import Component  from 'vue-class-component';

import cLink      from '../link/c-link.vue';
import cTitleCard from '../title-card/c-title-card.vue';
import * as T     from '../../types/common';

@Component({
  components: {
    cLink: cLink,
    cTitleCard: cTitleCard
  }
})

class Start extends Vue {
  onClick(): void {
    console.log('a non-vuex method has been called');
  }
};

export default Start;
