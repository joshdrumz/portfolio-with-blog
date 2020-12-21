<template>
  <v-app-bar app dark dense hide-on-scroll elevate-on-scroll>
    <v-btn icon>
      <g-link to="/">
        <v-icon>mdi-code-tags</v-icon>
      </g-link>
    </v-btn>

    <v-spacer />

    <template v-slot:extension>
      <v-tabs show-arrows centered fixed-tabs>
        <v-tabs-slider color="#65e620"></v-tabs-slider>
        <v-tab
          v-for="({ name, to }, i) in links"
          :key="i"
          :to="to"
          :ripple="{ class: 'green--text' }"
          class="white--text"
          >{{ name }}</v-tab
        >
      </v-tabs>
    </template>

    <v-spacer />

    <v-btn icon @click="toggleDarkMode">
      <div v-if="!$vuetify.theme.dark">
        <v-icon>mdi-moon-waning-crescent</v-icon>
      </div>
      <div v-else>
        <v-icon>mdi-white-balance-sunny</v-icon>
      </div>
    </v-btn>

    <v-btn icon v-for="({ icon, to }, i) in socials" :key="i">
      <a :href="to" target="_blank" rel="noopener noreferrer nofollow">
        <v-icon>{{ icon }}</v-icon>
      </a>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about/' },
        { name: 'Blog', to: '/blog/' },
        { name: 'Contact', to: '/contact/' }
      ],
      socials: [
        {
          to: 'https://www.linkedin.com/in/josh-arrants/',
          icon: 'mdi-linkedin'
        },
        { to: 'https://github.com/joshdrumz/', icon: 'mdi-github' },
        { to: 'mailto:joshgarrants@gmail.com', icon: 'mdi-email' },
        {
          to: '/',
          icon: 'mdi-file-document-outline'
        }
      ]
    };
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('dark_theme', this.$vuetify.theme.dark.toString());
    }
  },
  mounted() {
    const theme = localStorage.getItem('dark_theme');
    if (theme) {
      theme == 'true'
        ? (this.$vuetify.theme.dark = true)
        : (this.$vuetify.theme.dark = false);
    }
  }
};
</script>

<style scoped>
.v-toolbar__title a {
  text-decoration: none;
  color: white;
}

.v-btn a {
  text-decoration: none;
  color: white;
}
</style>