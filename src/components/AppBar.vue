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
          v-for="link in links"
          :key="link.id"
          :to="link.to"
          :ripple="{ class: 'green--text' }"
          >{{ link.name }}</v-tab
        >
      </v-tabs>
    </template>

    <v-spacer />

    <v-btn icon v-for="s in socials" :key="s.id">
      <g-link :to="s.to">
        <v-icon>{{ s.icon }}</v-icon>
      </g-link>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { id: 0, name: 'Home', to: '/' },
        { id: 1, name: 'About', to: '/about' },
        { id: 2, name: 'Blog', to: '/blog' },
        { id: 3, name: 'Contact', to: '/contact' }
      ],
      socials: [
        {
          id: 0,
          to: 'https://www.linkedin.com/in/josh-arrants/',
          icon: 'mdi-linkedin'
        },
        { id: 1, to: 'https://github.com/joshdrumz/', icon: 'mdi-github' },
        { id: 2, to: 'mailto:joshgarrants@gmail.com', icon: 'mdi-email' },
        {
          id: 3,
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