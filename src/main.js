import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router-config.js'
import VueResource from 'vue-resource'
		
import App from './App.vue'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter(routerConfig);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
