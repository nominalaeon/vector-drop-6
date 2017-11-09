
class Player {
  constructor(props) {
    this._vm = {};

    for (let prop in props) {
      if (!props.hasOwnProperty(prop)) {
        continue;
      }
      this[_.camelCase(prop)] = props[prop];
    }
  }

  get id() {
    return this._vm.id || '0000';
  }
  set id(id) {
    if (typeof id !== 'string') {
      id = id + '';
    }

    this._vm.id = id;
  }

  get score() {
    return this._vm.score || 0;
  }
  set score(score) {
    var _score = parseInt(score);
    this._vm.score = _.isNumber(_score) ? _score : 0;
  }
};

export default Player;
