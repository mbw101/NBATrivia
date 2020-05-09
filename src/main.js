// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './App.vue'
import router from './router'

// bootstrap-vue 
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue);

/* 
  Malcolm Wright
  May 3rd, 2020
  NBA Trivia
*/

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(app)
}).$mount("#app_div");
