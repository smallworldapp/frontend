import './sentry';
import './transitions.less';

import Vue from 'vue';

import store from './store';
import router from './router';
import RootComponent from './root';

import './uikit';

let app = new Vue({
    store,
    router,
    mixins: [RootComponent],
});

app.$mount('#mount');
