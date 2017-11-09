
var stage = {
  name: 'Stage',
  computed: {
    stage() {
      var stage = parseInt(this.$route.params.stage) || 0;

      return _.isNumber(stage) ? stage : 0;
    }
  }
};

console.log('stage.js', stage);

export default stage;
