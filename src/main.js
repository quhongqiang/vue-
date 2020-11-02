import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import { Toast } from 'vant';
import './style/base.scss';

Vue.use(Toast);
Vue.config.productionTip = false
Vue.prototype.$toast = Toast;

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
