import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import * as guards from './guards';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    // base: '/console/',
    mode: 'history',
    fallback: true,
});

guards.init(router);

export default router;
