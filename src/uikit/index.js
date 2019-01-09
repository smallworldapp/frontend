import Vue from 'vue';

import Input from './input';
import Datepicker from './datepicker';
import StyleFrame from './style-frame';
import PrivacySelector from './privacy-selector';

import AdminWorldSelector from './admin/world-selector';
import AdminAccountSelector from './admin/account-selector';

Vue.component('sw-input', Input);
Vue.component('sw-datepicker', Datepicker);
Vue.component('sw-style-frame', StyleFrame);
Vue.component('sw-privacy-selector', PrivacySelector);

Vue.component('sw-admin-world-selector', AdminWorldSelector);
Vue.component('sw-admin-account-selector', AdminAccountSelector);
