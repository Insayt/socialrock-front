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
import colorPicker from '@caohenghu/vue-colorpicker';
import vueTopprogress from 'vue-top-progress';
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css';
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
const socket = io('http://localhost:1932', { transports: ["websocket"] });

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VCalendar);
Vue.use(VueSweetalert2);
Vue.use(vueTopprogress);
Vue.use(VueSocketIOExt, socket);



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
  sockets: {
    connect() {
      console.log('socket connected')
    },
    customEmit(val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  data: {
    bus: new Vue({})
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
