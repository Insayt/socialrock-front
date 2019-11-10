import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VCalendar);
Vue.use(VueSweetalert2);

Object.defineProperty(Vue.prototype,"$bus",{
  get: function() {
    return this.$root.bus;
  }
});

new Vue({
  data: {
    bus: new Vue({})
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
