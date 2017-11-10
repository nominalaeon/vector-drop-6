
import Vue        from 'vue';
import Component  from 'vue-class-component';

import * as T     from '../../types/common';

@Component({
  name: 'CinematicComponent',
  props: {}
})

class Cinematic extends Vue {
  
  
  mounted() {
    console.info('Cinemtic initialized', this);
  };

  /**
   * General methods
   */

};

export default Cinematic;

