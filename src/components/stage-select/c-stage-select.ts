
import Vue        from 'vue';
import Component  from 'vue-class-component';

import * as T     from '../../types/common';

@Component({
  name: 'StageSelectComponent',
  components: {
    
  }
})

class StageSelect extends Vue {
  

  mounted() {
    console.info('StageSelect initialized', this);
  }
};

export default StageSelect;
