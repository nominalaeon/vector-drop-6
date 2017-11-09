
<template></template>

<script>

import stage      from '../view/stage/stage.vue';
import start      from '../view/start/start.vue';

var routes = [{
  // Start
  path: '/',
  component: start
}, {
  // Stage
  path: '/stage/:stage',
  component: stage
}, {
  // 404 Redirect
  path: '*',
  redirect: '/'
}];

var router = new VueRouter({
  routes: routes
});

export default router;

</script>

<style lang="css" scoped></style>
