import Vue from 'vue'
import App from './App.vue'

import whyDidYouComputed from '@'
Vue.use(whyDidYouComputed)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
