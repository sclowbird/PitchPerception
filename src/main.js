import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import Bars from "vuebars";
import Trend from "vuetrend";

Vue.use(BootstrapVue);
Vue.use(Bars);
Vue.use(Trend);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
