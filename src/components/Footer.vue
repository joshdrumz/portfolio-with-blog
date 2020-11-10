<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading">Connect with me!</strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon.to" class="mx-4" dark icon>
          <a :href="icon.to" target="_blank" rel="noopener noreferrer nofollow">
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </a>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Josh Arrants</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          to: 'https://www.linkedin.com/in/josh-arrants/',
          icon: 'mdi-linkedin'
        },
        { to: 'https://github.com/joshdrumz/', icon: 'mdi-github' }
      ]
    };
  }
};
</script>

<style scoped>
.v-btn a {
  text-decoration: none;
  color: white;
}
</style>