
import Level from '@classes/level.class';

import _isNumber from 'lodash/isNumber';

export default class Iron extends Level {
  constructor(props) {
    super(props);
  }

  decrease() {
    if (this.condition === this.threshold.min) return;

    this.condition = this.condition - 1;
  }

  increase() {
    if (this.condition === this.threshold.max) return;

    this.condition = this.condition + 1;
  }
};

/**
 * General methods
 */

/**
 * Private methods
 */
