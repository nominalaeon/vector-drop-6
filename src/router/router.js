
import Vue                from 'vue';
import Router             from 'vue-router';

import vStage             from '@views/stage/v-stage.vue';
import vStageSelect       from '@views/stage-select/v-stage-select.vue';
import vStart             from '@views/start/v-start.vue';

Vue.use(Router);

let redirectRoute = {
  // 404 Redirect
  path: '*',
  redirect: '/'
};

let stageRoute = {
  path: '/stage/:stage',
  name: 'Stage',
  component: vStage
};

let stageSelectRoute = {
  path: '/stage-select',
  name: 'Stage Select',
  component: vStageSelect
};

let startRoute = {
  path: '/',
  name: 'Start',
  component: vStart
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
