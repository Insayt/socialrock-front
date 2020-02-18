import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
// import Sketch from 'vue-color/src/components/Sketch';
import colorPicker from '@caohenghu/vue-colorpicker';
import vueTopprogress from 'vue-top-progress';
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VCalendar);
Vue.use(VueSweetalert2);
Vue.use(vueTopprogress);
Vue.component('multiselect', Multiselect);

Vue.component('VueSlider', VueSlider);
Vue.component('datetime', Datetime);
Vue.component('colorPicker', colorPicker);

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
