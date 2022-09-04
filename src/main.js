import moment from 'moment';
import Vue from "vue";
import "windi.css";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.prototype.moment = moment

new Vue({
  render: (h) => h(App),
}).$mount("#app");
