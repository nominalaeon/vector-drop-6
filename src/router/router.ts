import Vue              from 'vue';
import Router           from 'vue-router';
import {RouteConfig}    from 'vue-router';
import {RouterOptions}  from 'vue-router';

import cStage           from '../components/stage/c-stage.vue';
import cStageSelect     from '../components/stage-select/c-stage-select.vue';
import cStart           from '../components/start/c-start.vue';

Vue.use(Router);

let redirectRoute: RouteConfig = {
  // 404 Redirect
  path: '*',
  redirect: '/'
};

let stageRoute: RouteConfig = {
  path: '/stage/:stage',
  name: 'Stage',
  component: cStage
};

let stageSelectRoute: RouteConfig = {
  path: '/stage-select',
  name: 'Stage Select',
  component: cStageSelect
};

let startRoute:RouteConfig = {
  path: '/',
  name: 'Start',
  component: cStart
};

let routerOptions:RouterOptions = {
  routes: [
    redirectRoute,
    stageRoute,
    stageSelectRoute,
    startRoute
  ]
};
 
export default new Router(routerOptions);
