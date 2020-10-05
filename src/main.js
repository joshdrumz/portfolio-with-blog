// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// import 'prismjs/themes/prism-solarizedlight.css'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

require("gridsome-plugin-remark-prismjs-all/themes/tomorrow.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

import '@fortawesome/fontawesome-free/css/all.css'

export default function (Vue, { appOptions, head }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  })

  const opts = { //opts includes, vuetify themes, icons, etc.
    icons: {
      iconfont: 'fa'
    }
  }
  Vue.use(Vuetify)

  appOptions.vuetify = new Vuetify(opts)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
