
"use strict";

/**
 * Class
 */
class Api {
  constructor() {
    this.init.apply(this, arguments);
  }

  get baseUrl() {
    return './api/json/';
  }

  get url() {
    return {
      stage: `${this.baseUrl}stage.json`,
      victor: `${this.baseUrl}victor.json`
    };
  }
  
  /**
   * Init
   */

  init(props) {
    this._vm = {};

    for (var prop in props) {
      if (!props.hasOwnProperty(prop)) {
        continue;
      }
      this[prop] = props[prop];
    }

    console.info('Api ready', this);
  }

  /**
   * Requests
   */

  getStage() {
    return request('GET', this.url.stage);
  }

  getVictor() {
    return request('GET', this.url.victor);
  }
}

module.exports = Api;

/**
 * Private methods
 */

function request(type, url, data, dataType) {
  var params = {
    type: type,
    url: url,
    data: data,
    dataType: dataType || 'json'
  };

  !data && delete params.data;

  return $.ajax(params).then(transformResponse);
}

function transformRequest(data) {
  return JSON.stringify(data);
}

function transformResponse(results) {
  return {
    data: results
  };
}
