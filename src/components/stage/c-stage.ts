
import Vue        from 'vue';
import Component  from 'vue-class-component';

import cCinematic from '../cinematic/c-cinematic.vue';

import * as T     from '../../types/common';
import * as TC    from '../cinematic/i-cinematic';

@Component({
  name: 'StageComponent',
  components: {
    'cinematic': cCinematic
  }
})

class Stage extends Vue {
  private cinematics: TC.Cinematics = build();

  get cinematic() {
    return this.cinematics[this.stage] || {
      label: 'no cinema'
    };
  }

  get stage() {
    return this.$route.params.stage;
  }

  get title() {
    return `Lorem ${this.stage}`; // `Stage ${this.$route.params.stage}`;
  }

  mounted() {
    console.info('Stage initialized', this);
  }
};

export default Stage;

function build() {
  return {
    test: {
      label: 'testing'
    }
  }
}
