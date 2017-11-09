import Vue             from 'vue';
import Router          from 'vue-router';
import {RouteConfig}   from 'vue-router';
import {RouterOptions} from 'vue-router';

import cStart          from '../components/start/c-start.vue';

Vue.use(Router);

let startRoute:RouteConfig = {
  path: '/',
  name: 'Start',
  component: cStart
};

let routerOptions:RouterOptions = {
  routes: [startRoute]
};
 
export default new Router(routerOptions);
