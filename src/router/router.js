
import Vue                from 'vue';
import Router             from 'vue-router';

import templateStage       from '@templates/stage/stage.vue';
import templateStageSelect from '@templates/stage-select/stage-select.vue';
import templateStart       from '@templates/start/start.vue';

Vue.use(Router);

let redirectRoute = {
  // 404 Redirect
  path: '*',
  redirect: '/'
};

let stageRoute = {
  path: '/stage/:stage',
  name: 'Stage',
  component: templateStage
};

let stageSelectRoute = {
  path: '/stage-select',
  name: 'Stage Select',
  component: templateStageSelect
};

let startRoute = {
  path: '/',
  name: 'Start',
  component: templateStart
};

let routerOptions = {
  routes: [
    redirectRoute,
    stageRoute,
    stageSelectRoute,
    startRoute
  ]
};

export default new Router(routerOptions);
