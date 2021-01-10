// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import VueDisqus from 'vue-disqus';

require('gridsome-plugin-remark-prismjs-all/themes/tomorrow.css');
require('prismjs/plugins/line-numbers/prism-line-numbers.css');

export default function (Vue, { appOptions, head }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  });

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  });

  // head.script.push({
  //   src: 'https://platform.twitter.com/widgets.js',
  //   body: true,
  //   async: true,
  // })

  head.script.push({
    src: 'https://f.convertkit.com/ckjs/ck.5.js',
  });

  const opts = {
    theme: {
      dark: true
    }
  }; //opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify);

  Vue.use(VueDisqus);

  appOptions.vuetify = new Vuetify(opts);

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
}
