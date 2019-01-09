import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
    .config('https://7cf8a033f10e4cac97e55ab34d6896d5@sentry.io/235096')
    .addPlugin(RavenVue, Vue)
    .install();

// import * as process from 'process';

// let iframe = document.createElement('iframe');
// document.body.appendChild(iframe);
// let compare = Object.keys(iframe.contentWindow);

// let keys = Object.keys(window);
// console.log(keys.filter((k) => compare.indexOf(k) < 0));
// console.log(process.env);
// debugger;
