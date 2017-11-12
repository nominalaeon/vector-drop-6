
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
  
  get hiScore() {
    return _lpad(this.$store.state.hiScore.toString());
  }
  
  get score() {
    return _lpad(this.$store.state.player.score.toString());
  }

  mounted() {
    console.info('ScoreCard initialized', this);
  };

  /**
   * General methods
   */
  
  

};

export default ScoreBoard;

function _lpad(score: string) {
  while (score.length < 4) {
    score = `0${score}`;
  }

  return score;
}
