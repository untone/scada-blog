import Vue from 'vue'
import WebFont from 'webfontloader';
import PortalVue from 'portal-vue'

import ui from '@/utils/ui.js'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

Vue.use(PortalVue)

WebFont.load({
  google: {
    families: [
      'IBM Plex Serif:400:latin,cyrillic',
      'IBM Plex Sans:400:latin,cyrillic',
    ],
  },
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

