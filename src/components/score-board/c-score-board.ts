
import Vue       from 'vue';
import Component from 'vue-class-component';

import * as T    from '../../types/common';

@Component({
  name: 'ScoreBoardComponent',
  props: {
    id: String
  }
})

class ScoreBoard extends Vue {
  vm: {
    hiScore: Number
  } = {
    hiScore: 1000 //@todo: _getHiScore()
  };
  id: String;
  score: Number = 0;

  get hiScore() {
    console.log('get hiScore', this);
    return this.vm.hiScore > this.score ? this.vm.hiScore : this.score;
  }
  set hiScore(hiScore) {
    var _score = Number(hiScore);
    this.vm.hiScore = typeof _score === 'number' ? 1000 : _score;
  }

  mounted() {
    
  };

  /**
   * General methods
   */
  
  

};

export default ScoreBoard;
