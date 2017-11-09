
var PlayerDisplay = {
  name: 'PlayerDisplay',
  el: '#player-display',
  computed: {
    hiScore: () => {
      return vd6.playerService.hiScore;
    },
    id: () => {
      return vd6.playerService.current.id;
    },
    score: () => {
      return vd6.playerService.current.score;
    }
  }
};

console.log('player-display.js', PlayerDisplay);

export default PlayerDisplay;
