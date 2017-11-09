
import Player from './player.class.js';
import PlayerDisplay from '../player-display/player-display.vue';

class PlayerService {
  constructor(props) {
    this._vm = {};

    for (let prop in props) {
      if (!props.hasOwnProperty(prop)) {
        continue;
      }
      this[_.camelCase(prop)] = props[prop];
    }
  }

  static name() {
    return 'PlayerService';
  }

  get hiScore() {
    var hiScore = this._vm.hiScore || 1000;
    return hiScore > this.current.score ? hiScore : this.current.score;
  }
  set hiScore(hiScore) {
    var _score = parseInt(hiScore);
    this._vm.score = _.isNumber(_score) ? _score : 1000;
  }

  init() {
    var promise = this.initPlayer(this.playerId);
    
    return promise.then(this.initPlayerDisplay.bind(this));
  }

  initPlayer(playerId) {
    // @todo: if no id, create empty Player
    
    return this.collectPlayerData(playerId).then(this.assignPlayerData.bind(this));
  }

  initPlayerDisplay() {
    this.display = new Vue(PlayerDisplay);
  }

  /**
   * General methods
   */
 
  assignPlayerData(results) {
    this.current = new Player(results.data);
  }

  collectPlayerData(playerId) {
    // @todo: api call for player data,
    // delete existing code when doen
    
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          id: playerId || '1234',
          score: 5678
        }
      });
    });
  }
};

export default PlayerService;
