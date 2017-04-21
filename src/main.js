import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App';
import router from './router';
import store from './store';
import { currency } from './currency';

Vue.use(VueResource);
Vue.use(iView);
Vue.use(VueLazyload);
Vue.config.productionTip = false;

Vue.filter('currency', currency);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
