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
          >{{ name }}</v-tab
        >
      </v-tabs>
    </template>

    <v-spacer />

    <v-btn icon v-for="({ icon, to }, i) in socials" :key="i">
      <g-link :to="to">
        <v-icon>{{ icon }}</v-icon>
      </g-link>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Blog', to: '/blog' },
        { name: 'Contact', to: '/contact' }
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