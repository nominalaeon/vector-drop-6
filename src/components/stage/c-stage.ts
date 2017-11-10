
import Vue        from 'vue';
import Component  from 'vue-class-component';

import cCinematic from '../cinematic/c-cinematic.vue';

import * as T     from '../../types/common';

@Component({
  name: 'StageComponent',
  components: {
    'cinematic': cCinematic
  }
})

class Stage extends Vue {
  
  get title() {
    return `Lorem ${this.$route.params.stage}`; // `Stage ${this.$route.params.stage}`;
  }

  mounted() {
    console.info('Stage initialized', this);
  }
};

export default Stage;
